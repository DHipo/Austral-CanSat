import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { ReportStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs';
import { UPLOAD_DIR, removeUploadedFile, resolveUploadPath } from './upload-dir';

@Injectable()
export class FilesService {
  constructor(private readonly prisma: PrismaService) {
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }
  }

  async attachToReport(reportId: string, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No se ha subido ningún archivo.');
    }

    const report = reportId
      ? await this.prisma.report.findUnique({ where: { id: reportId }, select: { status: true } })
      : null;

    // Multer ya escribió el archivo: si no se puede asociar, se borra.
    if (!report || report.status === ReportStatus.OFFICIAL_ARCHIVED) {
      await removeUploadedFile(file.filename);
      throw new BadRequestException(
        report ? 'El informe está archivado y no admite cambios.' : `Reporte con ID ${reportId} no existe.`,
      );
    }

    return this.prisma.reportAttachment.create({
      data: {
        reportId,
        fileName: file.filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        sizeBytes: file.size,
        url: `/api/files/${file.filename}`,
      },
    });
  }

  /** Solo se sirven archivos registrados como adjuntos y dentro de la carpeta de uploads. */
  async getAttachmentFile(fileName: string) {
    const attachment = await this.prisma.reportAttachment.findFirst({ where: { fileName } });
    const filePath = attachment && resolveUploadPath(attachment.fileName);
    if (!attachment || !filePath || !fs.existsSync(filePath)) {
      throw new NotFoundException('Archivo no encontrado.');
    }
    return { attachment, filePath };
  }

  async removeAttachment(id: string) {
    const attachment = await this.prisma.reportAttachment.findUnique({
      where: { id },
      include: { report: { select: { status: true } } },
    });
    if (!attachment) {
      throw new NotFoundException('Adjunto no encontrado.');
    }
    if (attachment.report.status === ReportStatus.OFFICIAL_ARCHIVED) {
      throw new BadRequestException('El informe está archivado y no admite cambios.');
    }

    await this.prisma.reportAttachment.delete({ where: { id } });
    await removeUploadedFile(attachment.fileName);
    return { success: true };
  }
}
