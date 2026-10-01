import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
} from 'class-validator';
import { EventCategory } from '@prisma/client';

export class CreateCalendarEventDto {
  @ApiProperty({
    example: 'Ensayo de Paracaídas y Liberación 2m',
    description: 'Título del evento o hito de misión',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    example: 'Validación en caída libre del tiempo de respuesta del servo de suelta',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: '2026-07-20T14:00:00.000Z',
    description: 'Fecha y hora de inicio (ISO 8601)',
  })
  @IsISO8601()
  startDate: string;

  @ApiProperty({
    example: '2026-07-20T18:00:00.000Z',
    description: 'Fecha y hora de finalización (ISO 8601)',
  })
  @IsISO8601()
  endDate: string;

  @ApiProperty({
    enum: EventCategory,
    example: EventCategory.PARACHUTE_TEST,
    description: 'Categoría del evento de misión',
  })
  @IsEnum(EventCategory)
  category: EventCategory;

  @ApiPropertyOptional({
    example: 'Campus Universidad Austral (Zona abierta de vuelos)',
  })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Indica si es un hito crítico (Milestone)',
  })
  @IsBoolean()
  @IsOptional()
  isMilestone?: boolean;
}

export class UpdateCalendarEventDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsISO8601()
  @IsOptional()
  startDate?: string;

  @ApiPropertyOptional()
  @IsISO8601()
  @IsOptional()
  endDate?: string;

  @ApiPropertyOptional({ enum: EventCategory })
  @IsEnum(EventCategory)
  @IsOptional()
  category?: EventCategory;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  location?: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isMilestone?: boolean;
}
