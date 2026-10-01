import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'bdhipolito@austral.edu.ar',
    description: 'Email institucional del integrante de AuSat (Universidad Austral)',
  })
  @IsEmail({}, { message: 'Debe ingresar un email institucional válido' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Orbit2026!Lead',
    description: 'Contraseña del usuario técnico',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;
}
