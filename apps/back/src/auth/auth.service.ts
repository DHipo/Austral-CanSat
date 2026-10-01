import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { AUTHORIZED_ORBIT_EMAILS } from './auth.guard';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateAndLogin(loginDto: LoginDto, res: Response) {
    const emailNormalized = loginDto.email.trim().toLowerCase();

    // 1. Check if user is among authorized core members
    if (!AUTHORIZED_ORBIT_EMAILS.includes(emailNormalized)) {
      throw new ForbiddenException(
        'Acceso restringido: Solo los 3 miembros técnicos de AuSat tienen acceso al sistema Orbit.',
      );
    }

    // 2. Fetch user
    const user = await this.prisma.user.findUnique({
      where: { email: emailNormalized },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas.');
    }

    // 3. Verify password
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas.');
    }

    // 4. Generate JWT
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const token = await this.jwtService.signAsync(payload);

    // 5. Set HttpOnly Cookie
    const isProd = process.env.NODE_ENV === 'production';
    const cookieName = process.env.COOKIE_NAME || 'orbit_access_token';

    res.cookie(cookieName, token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'strict' : 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    const userProfile = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      career: user.career,
      subsystem: user.subsystem,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };

    return {
      success: true,
      message: 'Autenticación exitosa en AuSat Orbit.',
      user: userProfile,
      token, // Also returned for API/Mobile integration
    };
  }

  logout(res: Response) {
    const cookieName = process.env.COOKIE_NAME || 'orbit_access_token';
    res.clearCookie(cookieName, {
      httpOnly: true,
      path: '/',
    });

    return {
      success: true,
      message: 'Sesión cerrada correctamente en Orbit.',
    };
  }

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        career: true,
        subsystem: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado.');
    }

    return user;
  }
}
