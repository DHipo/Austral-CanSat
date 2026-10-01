import * as fs from 'fs';
import * as path from 'path';

export const UPLOAD_DIR = path.resolve(process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads'));

export const MAX_FILE_SIZE_MB = Number(process.env.MAX_FILE_SIZE_MB) || 25;

// Tipos de adjunto permitidos (telemetría, planillas, fotos, documentos).
export const ALLOWED_EXTENSIONS = ['.csv', '.txt', '.json', '.png', '.jpg', '.jpeg', '.pdf'];

/**
 * Ruta absoluta de un archivo guardado, o null si el nombre intenta salir
 * de la carpeta de uploads (p. ej. "../../etc/passwd").
 */
export function resolveUploadPath(fileName: string): string | null {
  const resolved = path.resolve(UPLOAD_DIR, path.basename(fileName));
  return resolved.startsWith(UPLOAD_DIR + path.sep) ? resolved : null;
}

export async function removeUploadedFile(fileName: string): Promise<void> {
  const filePath = resolveUploadPath(fileName);
  if (filePath) await fs.promises.rm(filePath, { force: true });
}
