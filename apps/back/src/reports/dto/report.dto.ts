import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ReportCategory, ReportStatus, FlightStage } from '@prisma/client';

export class CreateReportDto {
  @ApiProperty({
    example: 'Ensayo Térmico y de Vacío CanSat 2026',
    description: 'Título del reporte técnico',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    example: 'Comprobación de operatividad de microcontrolador ESP32-S3 a 60°C',
  })
  @IsString()
  @IsOptional()
  subtitle?: string;

  @ApiProperty({ enum: ReportCategory, example: ReportCategory.ENVIRONMENTAL_TEST })
  @IsEnum(ReportCategory)
  category: ReportCategory;

  @ApiProperty({ example: 'Aviónica & Sistemas', description: 'Subsistema involucrado' })
  @IsString()
  @IsNotEmpty()
  subsystem: string;

  @ApiPropertyOptional({ enum: FlightStage, example: FlightStage.PAD_IDLE })
  @IsEnum(FlightStage)
  @IsOptional()
  flightStage?: FlightStage;

  @ApiProperty({
    example: '# Objetivos del Ensayo\nVerificar la ausencia de deriva en el sensor BMP280...',
    description: 'Cuerpo técnico en formato Markdown o Rich-Text',
  })
  @IsString()
  @IsNotEmpty()
  contentMarkdown: string;

  @ApiPropertyOptional({ example: 'Calificar los componentes para la cámara térmica' })
  @IsString()
  @IsOptional()
  objective?: string;

  @ApiPropertyOptional({ example: 'Sin reseteos durante 120 minutos continuos' })
  @IsString()
  @IsOptional()
  findings?: string;

  @ApiPropertyOptional({ example: 'El diseño térmico disipa adecuadamente' })
  @IsString()
  @IsOptional()
  conclusions?: string;

  @ApiPropertyOptional({ example: 'Proceder al ensayo de vibración orbital' })
  @IsString()
  @IsOptional()
  nextSteps?: string;
}

export class UpdateReportDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  subtitle?: string;

  @ApiPropertyOptional({ enum: ReportCategory })
  @IsEnum(ReportCategory)
  @IsOptional()
  category?: ReportCategory;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  subsystem?: string;

  @ApiPropertyOptional({ enum: FlightStage, nullable: true, description: 'null quita la etapa de vuelo' })
  @IsEnum(FlightStage)
  @IsOptional()
  flightStage?: FlightStage | null;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  contentMarkdown?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  objective?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  findings?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  conclusions?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  nextSteps?: string;

  @ApiPropertyOptional({ enum: ReportStatus })
  @IsEnum(ReportStatus)
  @IsOptional()
  status?: ReportStatus;
}
