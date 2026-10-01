import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PrismaService } from '../prisma/prisma.service';

// The verified Austral CanSat 2026 Core Technical Team
export const AUTHORIZED_ORBIT_EMAILS = [
  'bdhipolito@austral.edu.ar',
  'mfernandez@austral.edu.ar',
  'srossi@austral.edu.ar',
];

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

@Injectable()
export class OrbitAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromRequest(request);

    if (!token) {
      throw new UnauthorizedException(
        'Acceso restringido: Se requiere una sesión activa en Orbit.',
      );
    }

    try {
      const secret = process.env.JWT_SECRET || 'ausat_conae_2026_super_secure_orbit_jwt_secret_key_austral_engineering';
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret,
      });

      // Strict verification: Verify user exists and is one of the 3 pre-seeded Austral technical members
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          career: true,
          subsystem: true,
          avatarUrl: true,
          isAuthorizedTechnical: true,
        },
      });

      if (!user) {
        throw new UnauthorizedException('Credenciales inválidas para Orbit.');
      }

      if (
        !user.isAuthorizedTechnical ||
        !AUTHORIZED_ORBIT_EMAILS.includes(user.email.toLowerCase())
      ) {
        throw new ForbiddenException(
          'Acceso denegado: Usuario no autorizado para el panel técnico de Orbit (AuSat CanSat).',
        );
      }

      // Attach user to request for downstream controllers
      request['user'] = user;
      return true;
    } catch (err) {
      if (err instanceof ForbiddenException || err instanceof UnauthorizedException) {
        throw err;
      }
      throw new UnauthorizedException('Token de sesión caducado o inválido.');
    }
  }

  private extractTokenFromRequest(request: Request): string | null {
    // 1. Primary: HttpOnly secure cookie
    const cookieName = process.env.COOKIE_NAME || 'orbit_access_token';
    if (request.cookies && request.cookies[cookieName]) {
      return request.cookies[cookieName];
    }

    // 2. Secondary fallback: Bearer token in Authorization header
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.split(' ')[1];
    }

    return null;
  }
}
