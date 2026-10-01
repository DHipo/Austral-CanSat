import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { OrbitAuthGuard } from './auth.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'ausat_conae_2026_super_secure_orbit_jwt_secret_key_austral_engineering',
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, OrbitAuthGuard],
  exports: [AuthService, OrbitAuthGuard, JwtModule],
})
export class AuthModule {}
