import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
  Res,
  Header,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { CreateReportDto, UpdateReportDto } from './dto/report.dto';
import { OrbitAuthGuard } from '../auth/auth.guard';
import { ReportCategory, ReportStatus } from '@prisma/client';
import { Request, Response } from 'express';

@ApiTags('Reports & Telemetry (Orbit Private)')
@Controller('reports')
@UseGuards(OrbitAuthGuard)
@ApiBearerAuth()
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar reportes técnicos y bitácoras',
    description: 'Filtra por categoría, estado o término de búsqueda.',
  })
  @ApiQuery({ name: 'category', enum: ReportCategory, required: false })
  @ApiQuery({ name: 'status', enum: ReportStatus, required: false })
  @ApiQuery({ name: 'search', required: false, type: String })
  async getReports(
    @Query('category') category?: ReportCategory,
    @Query('status') status?: ReportStatus,
    @Query('search') search?: string,
  ) {
    return this.reportsService.findAll(category, status, search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un reporte técnico completo por ID' })
  async getReport(@Param('id') id: string) {
    return this.reportsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo reporte técnico con cálculo de hash SHA-256' })
  @ApiResponse({ status: 201, description: 'Reporte creado y sellado con hash.' })
  async createReport(
    @Body() dto: CreateReportDto,
    @Req() req: Request,
  ) {
    const user = req['user'];
    return this.reportsService.create(dto, user.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar reporte técnico y recalcular hash de revisión' })
  async updateReport(
    @Param('id') id: string,
    @Body() dto: UpdateReportDto,
    @Req() req: Request,
  ) {
    const user = req['user'];
    return this.reportsService.update(id, dto, user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un reporte técnico' })
  async deleteReport(@Param('id') id: string) {
    return this.reportsService.remove(id);
  }

  @Get(':id/export-pdf')
  @ApiOperation({
    summary: 'Exportar informe oficial con membrete AuSat y marca de agua institucional',
    description: 'Genera el documento oficial listo para impresión directa o descarga como PDF.',
  })
  @Header('Content-Type', 'text/html; charset=utf-8')
  async exportReportPdf(
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const html = await this.reportsService.generatePrintHtml(id);
    return res.send(html);
  }
}
