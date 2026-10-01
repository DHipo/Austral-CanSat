import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
  Body,
  UseGuards,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';
import { FilesService } from './files.service';
import { OrbitAuthGuard } from '../auth/auth.guard';
import { ALLOWED_EXTENSIONS, MAX_FILE_SIZE_MB, UPLOAD_DIR } from './upload-dir';

// Se muestran en el navegador; el resto se descarga.
const INLINE_MIME = /^(image\/(png|jpeg)|application\/pdf)$/;

@ApiTags('File Management (Orbit Telemetry & Schematics)')
@Controller('files')
@UseGuards(OrbitAuthGuard)
@ApiBearerAuth()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @ApiOperation({
    summary: 'Subir archivo adjunto a un reporte técnico (CSV, esquemas, fotos)',
    description: `Guarda el archivo en el volumen local/Docker y lo asocia al reporte indicado. Tipos: ${ALLOWED_EXTENSIONS.join(', ')}.`,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        reportId: { type: 'string' },
        file: { type: 'string', format: 'binary' },
      },
      required: ['reportId', 'file'],
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: UPLOAD_DIR,
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `ausat-${uniqueSuffix}${extname(file.originalname).toLowerCase()}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const ok = ALLOWED_EXTENSIONS.includes(extname(file.originalname).toLowerCase());
        cb(ok ? null : new BadRequestException(`Tipo de archivo no permitido. Usá ${ALLOWED_EXTENSIONS.join(', ')}.`), ok);
      },
      limits: {
        fileSize: MAX_FILE_SIZE_MB * 1024 * 1024,
      },
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('reportId') reportId: string,
  ) {
    return this.filesService.attachToReport(reportId, file);
  }

  @Get(':filename')
  @ApiOperation({ summary: 'Descargar o visualizar un archivo adjunto' })
  async serveFile(@Param('filename') filename: string, @Res() res: Response) {
    const { attachment, filePath } = await this.filesService.getAttachmentFile(filename);
    const disposition = INLINE_MIME.test(attachment.mimeType) ? 'inline' : 'attachment';
    res.setHeader('Content-Disposition', `${disposition}; filename*=UTF-8''${encodeURIComponent(attachment.originalName)}`);
    res.setHeader('X-Content-Type-Options', 'nosniff');
    return res.sendFile(filePath);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un adjunto (registro y archivo)' })
  async deleteFile(@Param('id') id: string) {
    return this.filesService.removeAttachment(id);
  }
}
