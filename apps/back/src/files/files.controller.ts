import {
  Controller,
  Post,
  Get,
  Param,
  UseInterceptors,
  UploadedFile,
  Body,
  UseGuards,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Response } from 'express';
import { FilesService } from './files.service';
import { OrbitAuthGuard } from '../auth/auth.guard';

const uploadDir = process.env.UPLOAD_DIR || join(process.cwd(), 'uploads');

@ApiTags('File Management (Orbit Telemetry & Schematics)')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseGuards(OrbitAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Subir archivo adjunto a un reporte técnico (CSV, esquemas, fotos)',
    description: 'Guarda el archivo en el volumen local/Docker y lo asocia al reporte indicado.',
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
        destination: uploadDir,
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `ausat-${uniqueSuffix}${ext}`);
        },
      }),
      limits: {
        fileSize: 25 * 1024 * 1024, // 25 MB max limit
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
  @ApiOperation({ summary: 'Descargar o visualizar un archivo almacenado' })
  serveFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = this.filesService.getFilePath(filename);
    return res.sendFile(filePath);
  }
}
