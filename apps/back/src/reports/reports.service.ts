import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReportDto, UpdateReportDto } from './dto/report.dto';
import { ReportCategory, ReportStatus } from '@prisma/client';
import * as crypto from 'crypto';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  private generateRevisionHash(title: string, content: string, authorId: string): string {
    const timestamp = new Date().toISOString();
    return crypto
      .createHash('sha256')
      .update(`${title}::${content}::${authorId}::${timestamp}`)
      .digest('hex');
  }

  async findAll(category?: ReportCategory, status?: ReportStatus, search?: string) {
    const where: any = {};

    if (category) where.category = category;
    if (status) where.status = status;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { subtitle: { contains: search, mode: 'insensitive' } },
        { contentMarkdown: { contains: search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.report.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            career: true,
            subsystem: true,
          },
        },
        attachments: true,
      },
    });
  }

  async findOne(id: string) {
    const report = await this.prisma.report.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            career: true,
            subsystem: true,
          },
        },
        attachments: true,
      },
    });

    if (!report) {
      throw new NotFoundException(`Informe técnico con ID ${id} no encontrado.`);
    }

    return report;
  }

  async create(dto: CreateReportDto, authorId: string) {
    const revisionHash = this.generateRevisionHash(dto.title, dto.contentMarkdown, authorId);

    return this.prisma.report.create({
      data: {
        title: dto.title,
        subtitle: dto.subtitle,
        category: dto.category,
        subsystem: dto.subsystem,
        flightStage: dto.flightStage,
        contentMarkdown: dto.contentMarkdown,
        objective: dto.objective,
        findings: dto.findings,
        conclusions: dto.conclusions,
        nextSteps: dto.nextSteps,
        status: dto.status || ReportStatus.DRAFT,
        revisionHash,
        authorId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        attachments: true,
      },
    });
  }

  async update(id: string, dto: UpdateReportDto, modifierId: string) {
    const existing = await this.findOne(id);

    const revisionHash = this.generateRevisionHash(
      dto.title || existing.title,
      dto.contentMarkdown || existing.contentMarkdown,
      modifierId,
    );

    return this.prisma.report.update({
      where: { id },
      data: {
        ...dto,
        revisionHash,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        attachments: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.report.delete({ where: { id } });
    return { success: true, message: `Informe ${id} eliminado.` };
  }

  /**
   * Generates official print-ready document HTML with AuSat watermark, official letterhead,
   * verification hash and print styles for PDF conversion or browser print.
   */
  async generatePrintHtml(id: string): Promise<string> {
    const report = await this.findOne(id);
    const dateFormatted = new Date(report.createdAt).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>AuSat Orbit - Reporte ${report.id}</title>
  <style>
    @page {
      size: A4;
      margin: 20mm 15mm 20mm 15mm;
      @bottom-center {
        content: "Página " counter(page) " de " counter(pages);
      }
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif;
      color: #17264F;
      background-color: #FFFFFF;
      margin: 0;
      padding: 24px;
      line-height: 1.6;
      position: relative;
    }
    /* Centered Watermark */
    .watermark {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-30deg);
      font-size: 72px;
      font-weight: 800;
      color: rgba(11, 22, 51, 0.04);
      text-transform: uppercase;
      letter-spacing: 0.15em;
      pointer-events: none;
      z-index: 0;
      white-space: nowrap;
      user-select: none;
    }
    .header-table {
      width: 100%;
      border-bottom: 2px solid #FF7A1A;
      padding-bottom: 12px;
      margin-bottom: 24px;
    }
    .header-logo {
      font-size: 26px;
      font-weight: 800;
      letter-spacing: -0.03em;
      color: #0B1633;
    }
    .header-sub {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #5A6785;
      font-weight: 600;
    }
    .meta-box {
      background-color: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 14px 18px;
      margin-bottom: 24px;
      font-size: 13px;
    }
    .meta-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }
    .meta-item strong {
      color: #0B1633;
      display: inline-block;
      width: 120px;
    }
    h1 {
      font-size: 24px;
      color: #0B1633;
      margin-top: 0;
      margin-bottom: 8px;
      letter-spacing: -0.02em;
    }
    .subtitle {
      font-size: 15px;
      color: #5A6785;
      margin-bottom: 20px;
    }
    .section-title {
      font-size: 16px;
      font-weight: 700;
      color: #0B1633;
      border-left: 4px solid #FF7A1A;
      padding-left: 10px;
      margin-top: 24px;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .content-block {
      font-size: 14px;
      color: #17264F;
      white-space: pre-wrap;
      margin-bottom: 16px;
    }
    .hash-badge {
      font-family: monospace;
      background: #0B1633;
      color: #EEF2FA;
      padding: 6px 10px;
      border-radius: 4px;
      font-size: 11px;
      word-break: break-all;
    }
    .footer-signatures {
      margin-top: 48px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      text-align: center;
      page-break-inside: avoid;
    }
    .signature-line {
      border-top: 1px solid #94A3B8;
      padding-top: 6px;
      font-size: 11px;
      color: #5A6785;
    }
    @media print {
      body { padding: 0; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body>
  <div class="watermark">AuSat Orbit • Oficial</div>

  <table class="header-table">
    <tr>
      <td>
        <div class="header-logo">AuSat Orbit</div>
        <div class="header-sub">Universidad Austral • Competencia CanSat CONAE 2026</div>
      </td>
      <td style="text-align: right;">
        <span style="display: inline-block; padding: 4px 10px; background: #FF7A1A; color: #FFFFFF; font-size: 11px; font-weight: 700; border-radius: 4px; text-transform: uppercase;">
          ${report.status}
        </span>
      </td>
    </tr>
  </table>

  <h1>${report.title}</h1>
  ${report.subtitle ? `<div class="subtitle">${report.subtitle}</div>` : ''}

  <div class="meta-box">
    <div class="meta-grid">
      <div class="meta-item"><strong>Autor:</strong> ${report.author?.name || 'Equipo AuSat'} (${report.author?.role || 'Ingeniería'})</div>
      <div class="meta-item"><strong>Fecha de Emisión:</strong> ${dateFormatted}</div>
      <div class="meta-item"><strong>Categoría:</strong> ${report.category}</div>
      <div class="meta-item"><strong>Subsistema:</strong> ${report.subsystem}</div>
      <div class="meta-item"><strong>Etapa de Vuelo:</strong> ${report.flightStage || 'N/A'}</div>
      <div class="meta-item"><strong>ID de Informe:</strong> ${report.id}</div>
    </div>
    <div style="margin-top: 10px;">
      <strong>Hash de Integridad (SHA-256):</strong>
      <div class="hash-badge">${report.revisionHash}</div>
    </div>
  </div>

  ${report.objective ? `
  <div class="section-title">1. Objetivo de la Misión / Ensayo</div>
  <div class="content-block">${report.objective}</div>` : ''}

  <div class="section-title">2. Desarrollo Técnico & Memoria</div>
  <div class="content-block">${report.contentMarkdown}</div>

  ${report.findings ? `
  <div class="section-title">3. Hallazgos y Mediciones Clave</div>
  <div class="content-block">${report.findings}</div>` : ''}

  ${report.conclusions ? `
  <div class="section-title">4. Conclusiones</div>
  <div class="content-block">${report.conclusions}</div>` : ''}

  ${report.nextSteps ? `
  <div class="section-title">5. Próximos Pasos & Hitos CONAE</div>
  <div class="content-block">${report.nextSteps}</div>` : ''}

  <div class="footer-signatures">
    <div>
      <div class="signature-line">
        <strong>Bautista D'Hipólito</strong><br/>
        Líder de Proyecto & Sistemas
      </div>
    </div>
    <div>
      <div class="signature-line">
        <strong>María Paz Fogliato</strong><br/>
        Aviónica & Hardware
      </div>
    </div>
    <div>
      <div class="signature-line">
        <strong>Joaquín Viani</strong><br/>
        Dinámica & Vuelo
      </div>
    </div>
  </div>
</body>
</html>`;
  }
}
