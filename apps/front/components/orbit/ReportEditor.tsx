'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, FileText, Paperclip, ShieldCheck, Upload, X } from 'lucide-react';
import { FlightStage, ReportCategory, ReportStatus } from '@orbit/shared';
import { FLIGHT_STAGE, REPORT_CATEGORY, SUBSYSTEMS } from '../../lib/orbit/labels';
import { roleLabel } from '../../lib/orbit/team';
import {
  ACCEPTED_FILES,
  MAX_FILE_MB,
  createReport,
  deleteAttachment,
  formatFileSize,
  updateReport,
  uploadAttachment,
  type Report,
  type ReportAttachment,
  type ReportInput,
} from '../../lib/orbit/reports';
import { useCurrentUser } from './auth/AuthProvider';
import { ReportPrintView } from './ReportPrintView';
import { Button, Card, CardBody, CardHeader, Field, Input, PageHeader, Select, Textarea } from './ui';

const ACCEPTED_EXTENSIONS = ACCEPTED_FILES.split(',');

function toInput(report?: Report): ReportInput {
  return {
    title: report?.title ?? '',
    subtitle: report?.subtitle ?? '',
    category: report?.category ?? ReportCategory.INVESTIGATION,
    subsystem: report?.subsystem ?? SUBSYSTEMS[0],
    flightStage: report?.flightStage ?? null,
    contentMarkdown: report?.contentMarkdown ?? '',
    objective: report?.objective ?? '',
    findings: report?.findings ?? '',
    conclusions: report?.conclusions ?? '',
    nextSteps: report?.nextSteps ?? '',
  };
}

interface ReportEditorProps {
  /** Informe a editar; si no se pasa, se crea uno nuevo. */
  report?: Report;
}

export const ReportEditor: React.FC<ReportEditorProps> = ({ report }) => {
  const user = useCurrentUser();
  const router = useRouter();
  const [form, setForm] = useState<ReportInput>(() => toInput(report));
  // Una vez creado, los guardados siguientes actualizan el mismo informe.
  const [reportId, setReportId] = useState<string | null>(report?.id ?? null);
  const [existing, setExisting] = useState<ReportAttachment[]>(report?.attachments ?? []);
  const [pending, setPending] = useState<File[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileNotice, setFileNotice] = useState<string | null>(null);
  const [isPreviewingPrint, setIsPreviewingPrint] = useState(false);

  const set = <K extends keyof ReportInput>(key: K, value: ReportInput[K]) => setForm((f) => ({ ...f, [key]: value }));

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const valid = files.filter(
      (f) =>
        f.size <= MAX_FILE_MB * 1024 * 1024 &&
        ACCEPTED_EXTENSIONS.includes(f.name.slice(f.name.lastIndexOf('.')).toLowerCase()),
    );
    const rejected = files.length - valid.length;
    setFileNotice(
      rejected > 0
        ? `${rejected === 1 ? 'Un archivo no se agregó' : `${rejected} archivos no se agregaron`}: tipo no permitido o más de ${MAX_FILE_MB} MB.`
        : null,
    );
    setPending((prev) => [...prev, ...valid]);
    e.target.value = '';
  };

  const removeExisting = async (attachment: ReportAttachment) => {
    try {
      await deleteAttachment(attachment.id);
      setExisting((list) => list.filter((a) => a.id !== attachment.id));
    } catch (err) {
      setFileNotice(err instanceof Error ? err.message : 'No se pudo quitar el adjunto.');
    }
  };

  const handleSave = async () => {
    if (!form.title.trim()) return setError('Poné un título.');
    if (!form.contentMarkdown.trim()) return setError('Completá el desarrollo del informe.');

    setSaving(true);
    setError(null);
    try {
      const saved = reportId ? await updateReport(reportId, form) : await createReport(form);
      setReportId(saved.id);

      // Adjuntos nuevos: los que fallan quedan en la lista para reintentar.
      const failed: File[] = [];
      for (const file of pending) {
        try {
          const attachment = await uploadAttachment(saved.id, file);
          setExisting((list) => [...list, attachment]);
        } catch {
          failed.push(file);
        }
      }
      setPending(failed);

      if (failed.length > 0) {
        setError(
          `El informe se guardó, pero no se pudieron subir: ${failed.map((f) => f.name).join(', ')}. Volvé a guardar para reintentar.`,
        );
        return;
      }
      router.push(`/orbit/reports/${saved.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo guardar el informe.');
    } finally {
      setSaving(false);
    }
  };

  if (isPreviewingPrint) {
    return (
      <ReportPrintView
        onBack={() => setIsPreviewingPrint(false)}
        backLabel="Volver al editor"
        report={{
          ...form,
          id: reportId ?? 'borrador',
          title: form.title || 'Informe sin título',
          contentMarkdown: form.contentMarkdown || 'Sin contenido.',
          status: report?.status ?? ReportStatus.DRAFT,
          revisionHash: report?.revisionHash ?? 'pendiente (se genera al guardar en el servidor)',
          createdAt: report?.createdAt ?? new Date().toISOString(),
          author: report
            ? { name: report.author.name, role: roleLabel(report.author) }
            : { name: user.name, role: roleLabel(user), email: user.email },
          attachments: existing,
        }}
      />
    );
  }

  const isEditing = !!report;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Documentación técnica"
        title={isEditing ? 'Editar informe' : 'Nuevo informe'}
        description="Documentá investigaciones, ensayos y minutas con el formato oficial del equipo."
        actions={
          <>
            <Button variant="secondary" onClick={() => setIsPreviewingPrint(true)}>
              <Eye className="h-4 w-4" />
              Vista previa
            </Button>
            <Button variant="primary" onClick={handleSave} disabled={saving}>
              {saving ? 'Guardando…' : 'Guardar'}
            </Button>
          </>
        }
      />

      {error && (
        <p role="alert" className="rounded-2xl border border-err/30 bg-err/10 px-5 py-3.5 text-sm font-medium text-err">
          {error}
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Contenido */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardBody className="space-y-4">
              <Field label="Título" htmlFor="r-title">
                <Input
                  id="r-title"
                  value={form.title}
                  onChange={(e) => set('title', e.target.value)}
                  placeholder="Ej: Prueba de autonomía con celdas 18650"
                />
              </Field>
              <Field label="Subtítulo / alcance" htmlFor="r-subtitle">
                <Input
                  id="r-subtitle"
                  value={form.subtitle}
                  onChange={(e) => set('subtitle', e.target.value)}
                  placeholder="Ej: Descarga continua de 2 h con carga simulada"
                />
              </Field>
            </CardBody>
          </Card>

          <Card>
            <CardHeader
              icon={FileText}
              title="Desarrollo"
              description="Procedimiento, instrumental y metodología. Admite Markdown: # títulos, - listas, **negrita**, tablas."
            />
            <CardBody>
              <Textarea
                rows={12}
                value={form.contentMarkdown}
                onChange={(e) => set('contentMarkdown', e.target.value)}
                placeholder="Describí el procedimiento experimental…"
                className="font-mono text-sm"
                aria-label="Desarrollo"
              />
            </CardBody>
          </Card>

          <Card>
            <CardBody className="space-y-4">
              <Field label="Objetivo" htmlFor="r-objective">
                <Textarea id="r-objective" rows={3} value={form.objective} onChange={(e) => set('objective', e.target.value)} placeholder="Qué se busca validar o responder." />
              </Field>
              <Field label="Mediciones y hallazgos" htmlFor="r-findings">
                <Textarea id="r-findings" rows={3} value={form.findings} onChange={(e) => set('findings', e.target.value)} placeholder="Datos clave, curvas, resultados." />
              </Field>
              <Field label="Conclusiones" htmlFor="r-conclusions">
                <Textarea id="r-conclusions" rows={3} value={form.conclusions} onChange={(e) => set('conclusions', e.target.value)} />
              </Field>
              <Field label="Próximos pasos" htmlFor="r-next">
                <Textarea id="r-next" rows={3} value={form.nextSteps} onChange={(e) => set('nextSteps', e.target.value)} />
              </Field>
            </CardBody>
          </Card>
        </div>

        {/* Metadatos */}
        <div className="space-y-6">
          <Card>
            <CardHeader title="Detalles" />
            <CardBody className="space-y-4">
              <Field label="Categoría" htmlFor="r-category">
                <Select id="r-category" value={form.category} onChange={(e) => set('category', e.target.value as ReportCategory)}>
                  {Object.entries(REPORT_CATEGORY).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Subsistema" htmlFor="r-subsystem">
                <Select id="r-subsystem" value={form.subsystem} onChange={(e) => set('subsystem', e.target.value)}>
                  {/* Un subsistema guardado que ya no está en la lista se sigue mostrando */}
                  {[...SUBSYSTEMS, ...(SUBSYSTEMS.includes(form.subsystem as (typeof SUBSYSTEMS)[number]) ? [] : [form.subsystem])].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Etapa de vuelo" htmlFor="r-stage" hint="Opcional. Solo si el informe aplica a una etapa concreta.">
                <Select
                  id="r-stage"
                  value={form.flightStage ?? ''}
                  onChange={(e) => set('flightStage', (e.target.value || null) as FlightStage | null)}
                >
                  <option value="">No aplica</option>
                  {Object.entries(FLIGHT_STAGE).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Select>
              </Field>
            </CardBody>
          </Card>

          <Card>
            <CardHeader icon={Paperclip} title="Adjuntos" description={`CSV, TXT, JSON, imágenes o PDF · hasta ${MAX_FILE_MB} MB`} />
            <CardBody className="space-y-3">
              <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-line px-4 py-8 text-center transition-colors hover:border-brand/50">
                <Upload className="mb-1.5 h-5 w-5 text-fg-subtle transition-colors group-hover:text-brand" />
                <span className="text-sm font-semibold text-fg-muted">Elegí archivos</span>
                <span className="mt-0.5 text-xs text-fg-subtle">Se suben al guardar</span>
                <input type="file" multiple accept={ACCEPTED_FILES} onChange={handleFileUpload} className="hidden" />
              </label>
              {fileNotice && <p className="text-xs font-medium text-warn">{fileNotice}</p>}
              {(existing.length > 0 || pending.length > 0) && (
                <ul className="space-y-1.5">
                  {existing.map((a) => (
                    <li key={a.id} className="flex items-center gap-2 rounded-xl border border-line bg-fg/[0.04] px-3 py-2.5 text-sm">
                      <a href={a.url} target="_blank" rel="noopener noreferrer" className="min-w-0 flex-1 truncate text-fg hover:underline">
                        {a.originalName}
                      </a>
                      <span className="shrink-0 text-fg-subtle">{formatFileSize(a.sizeBytes)}</span>
                      <button
                        onClick={() => removeExisting(a)}
                        className="shrink-0 rounded p-0.5 text-fg-subtle hover:text-err cursor-pointer"
                        aria-label={`Quitar ${a.originalName}`}
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  ))}
                  {pending.map((file, idx) => (
                    <li key={`${file.name}-${idx}`} className="flex items-center gap-2 rounded-xl border border-dashed border-line px-3 py-2.5 text-sm">
                      <span className="min-w-0 flex-1 truncate text-fg-muted">{file.name}</span>
                      <span className="shrink-0 text-fg-subtle">{formatFileSize(file.size)}</span>
                      <button
                        onClick={() => setPending((prev) => prev.filter((_, i) => i !== idx))}
                        className="shrink-0 rounded p-0.5 text-fg-subtle hover:text-err cursor-pointer"
                        aria-label={`Quitar ${file.name}`}
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </CardBody>
          </Card>

          <Card>
            <CardBody className="flex gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-ok" />
              <p className="text-sm leading-relaxed text-fg-muted">
                Al guardar, el servidor calcula un hash SHA-256 de la revisión que se imprime en el documento oficial.
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};
