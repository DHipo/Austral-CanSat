import {
  Controller,
  Post,
  Get,
  Body,
  Res,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { OrbitAuthGuard } from './auth.guard';
import { CurrentUser, AuthenticatedUser } from './current-user.decorator';

@ApiTags('Authentication (Orbit Private System)')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Autenticación en Orbit (Solo los 3 integrantes técnicos de AuSat)',
    description: 'Genera una cookie HttpOnly `orbit_access_token` segura tras validar credenciales.',
  })
  @ApiResponse({ status: 200, description: 'Sesión iniciada exitosamente.' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
  @ApiResponse({ status: 403, description: 'Usuario no autorizado para Orbit.' })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.validateAndLogin(loginDto, res);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cerrar sesión y limpiar cookie de acceso' })
  @ApiResponse({ status: 200, description: 'Sesión cerrada exitosamente.' })
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }

  @Get('me')
  @UseGuards(OrbitAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener perfil del usuario técnico autenticado' })
  @ApiResponse({ status: 200, description: 'Perfil retornado.' })
  @ApiResponse({ status: 401, description: 'No autenticado.' })
  async getProfile(@CurrentUser() user: AuthenticatedUser) {
    return this.authService.getMe(user.id);
  }
}
