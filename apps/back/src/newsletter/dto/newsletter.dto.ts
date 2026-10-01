import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SubscribeNewsletterDto {
  @ApiProperty({
    example: 'contacto@colegio-austral.edu.ar',
    description: 'Correo electrónico para recibir novedades y avances de la misión CanSat',
  })
  @IsEmail({}, { message: 'Debe proporcionar una dirección de email válida' })
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional({ example: 'Ing. Lucas Díaz' })
  @IsString()
  @IsOptional()
  fullName?: string;

  @ApiPropertyOptional({ example: 'Universidad Austral - Fac. de Ingeniería' })
  @IsString()
  @IsOptional()
  institution?: string;
}
