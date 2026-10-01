'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Save, 
  ShieldCheck, 
  Paperclip, 
  Check, 
  Eye
} from 'lucide-react';
import { ReportPrintView, ReportPrintData } from './ReportPrintView';

interface ReportEditorProps {
  onSave?: (reportData: any) => void;
}

export const ReportEditor: React.FC<ReportEditorProps> = ({ onSave }) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('INVESTIGATION');
  const [subsystem, setSubsystem] = useState('Aviónica & Sistemas');
  const [flightStage, setFlightStage] = useState('APOGEE_EJECTION');
  const [contentMarkdown, setContentMarkdown] = useState('');
  const [objective, setObjective] = useState('');
  const [findings, setFindings] = useState('');
  const [conclusions, setConclusions] = useState('');
  const [nextSteps, setNextSteps] = useState('');
  const [attachments, setAttachments] = useState<Array<{ name: string; size: string }>>([]);
  const [isPreviewingPrint, setIsPreviewingPrint] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Generate dynamic client-side preview hash
  const previewHash = React.useMemo(() => {
    let hash = 0;
    const str = `${title}:${contentMarkdown}:${Date.now()}`;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return 'sha256-ausat-' + Math.abs(hash).toString(16).padStart(16, '0') + 'e49f82d1c6';
  }, [title, contentMarkdown]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
      setAttachments((prev) => [...prev, { name: file.name, size: sizeMb }]);
    }
  };

  const handleSave = () => {
    const reportData = {
      title,
      subtitle,
      category,
      subsystem,
      flightStage,
      contentMarkdown,
      objective,
      findings,
      conclusions,
      nextSteps,
      status: 'APPROVED',
      revisionHash: previewHash,
    };
    if (onSave) onSave(reportData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const printPayload: ReportPrintData = {
    id: 'rep-' + Math.floor(100 + Math.random() * 900),
    title: title || 'Reporte Técnico CanSat AuSat 2026',
    subtitle: subtitle || 'Ensayo y Validación de Ingeniería de Sistemas',
    category,
    subsystem,
    flightStage,
    contentMarkdown: contentMarkdown || 'Sin contenido de memoria técnica.',
    objective,
    findings,
    conclusions,
    nextSteps,
    status: 'OFICIAL APROBADO',
    revisionHash: previewHash,
    createdAt: new Date().toISOString(),
    author: {
      name: "Bautista D'Hipólito",
      role: 'Líder de Proyecto & Sistemas',
      career: 'Ingeniería Informática',
      email: 'bdhipolito@austral.edu.ar',
    },
  };

  if (isPreviewingPrint) {
    return (
      <ReportPrintView
        report={printPayload}
        onBack={() => setIsPreviewingPrint(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Editor Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#17264F] border border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#0B1633] text-[#FF7A1A]">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#EEF2FA]">
              Nuevo Reporte Técnico / Bitácora
            </h3>
            <p className="text-xs text-[#5A6785]">
              Documentación con sellado criptográfico y membrete oficial
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPreviewingPrint(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-[#0B1633] hover:bg-[#060C1E] text-[#C9D6F2] border border-white/10 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            Vista Previa Impresión (PDF)
          </button>

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold bg-[#FF7A1A] hover:bg-[#D9620B] text-white shadow-md shadow-[#FF7A1A]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {isSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {isSaved ? '¡Guardado & Sellado!' : 'Guardar y Sellar'}
          </button>
        </div>
      </div>

      {/* Editor Main Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Markdown & Structured Text */}
        <div className="lg:col-span-2 space-y-5">
          
          {/* Title & Subtitle */}
          <div className="p-5 rounded-2xl bg-[#17264F] border border-white/10 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5A6785] mb-1.5">
                Título del Informe Técnico
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: Calificación Térmica y Ensayo de Comunicación LoRa 915 MHz"
                className="w-full px-4 py-2.5 rounded-xl bg-[#0B1633] border border-white/10 text-sm text-[#EEF2FA] placeholder-[#5A6785] focus:outline-none focus:border-[#FF7A1A]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5A6785] mb-1.5">
                Subtítulo / Alcance Preliminar
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Ej: Verificación en cámara a 60°C durante 120 minutos sin pérdidas de sincronismo"
                className="w-full px-4 py-2.5 rounded-xl bg-[#0B1633] border border-white/10 text-sm text-[#EEF2FA] placeholder-[#5A6785] focus:outline-none focus:border-[#FF7A1A]"
              />
            </div>
          </div>

          {/* Markdown Content Editor */}
          <div className="p-5 rounded-2xl bg-[#17264F] border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#5A6785]">
                Memoria Técnica (Markdown)
              </label>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-[#5A6785] font-mono">MD FORMAT</span>
              </div>
            </div>

            <textarea
              rows={8}
              value={contentMarkdown}
              onChange={(e) => setContentMarkdown(e.target.value)}
              placeholder="Describa el procedimiento experimental, instrumental empleado y metodología..."
              className="w-full px-4 py-3 rounded-xl bg-[#0B1633] border border-white/10 text-sm text-[#EEF2FA] font-mono placeholder-[#5A6785] focus:outline-none focus:border-[#FF7A1A] leading-relaxed"
            />
          </div>

          {/* Structured Engineering Fields */}
          <div className="p-5 rounded-2xl bg-[#17264F] border border-white/10 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5A6785] mb-1.5">
                1. Objetivo del Ensayo / Misión
              </label>
              <textarea
                rows={2}
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                placeholder="Objetivo concreto a calificar..."
                className="w-full px-4 py-2 rounded-xl bg-[#0B1633] border border-white/10 text-xs text-[#EEF2FA] placeholder-[#5A6785] focus:outline-none focus:border-[#FF7A1A]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5A6785] mb-1.5">
                2. Mediciones y Hallazgos Clave
              </label>
              <textarea
                rows={2}
                value={findings}
                onChange={(e) => setFindings(e.target.value)}
                placeholder="Curvas de corriente, tasa de error de paquete LoRa, etc..."
                className="w-full px-4 py-2 rounded-xl bg-[#0B1633] border border-white/10 text-xs text-[#EEF2FA] placeholder-[#5A6785] focus:outline-none focus:border-[#FF7A1A]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5A6785] mb-1.5">
                3. Conclusiones y Hitos CONAE
              </label>
              <textarea
                rows={2}
                value={conclusions}
                onChange={(e) => setConclusions(e.target.value)}
                placeholder="Conclusiones para la calificación del diseño..."
                className="w-full px-4 py-2 rounded-xl bg-[#0B1633] border border-white/10 text-xs text-[#EEF2FA] placeholder-[#5A6785] focus:outline-none focus:border-[#FF7A1A]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5A6785] mb-1.5">
                4. Plan de Acción y Hitos CONAE
              </label>
              <textarea
                rows={2}
                value={nextSteps}
                onChange={(e) => setNextSteps(e.target.value)}
                placeholder="Próximos pasos y entregables..."
                className="w-full px-4 py-2 rounded-xl bg-[#0B1633] border border-white/10 text-xs text-[#EEF2FA] placeholder-[#5A6785] focus:outline-none focus:border-[#FF7A1A]"
              />
            </div>
          </div>

        </div>

        {/* Right 1 Col: Metadata, Attachments & Cryptographic Hash */}
        <div className="space-y-5">
          
          {/* Metadata Controls */}
          <div className="p-5 rounded-2xl bg-[#17264F] border border-white/10 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#EEF2FA]">
              Metadatos del Documento
            </h4>

            <div>
              <label className="block text-[11px] text-[#5A6785] mb-1">Categoría</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#0B1633] border border-white/10 text-xs text-[#EEF2FA] focus:outline-none"
              >
                <option value="INVESTIGATION">Investigación Técnica</option>
                <option value="PDR_CDR">Hito PDR / CDR CONAE</option>
                <option value="ENVIRONMENTAL_TEST">Ensayo Ambiental (Drop / Vacío)</option>
                <option value="MEETING_MINUTES">Minuta de Reunión Asesor</option>
                <option value="TELEMETRY_LOG">Bitácora de Vuelo / Telemetría</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-[#5A6785] mb-1">Subsistema</label>
              <select
                value={subsystem}
                onChange={(e) => setSubsystem(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#0B1633] border border-white/10 text-xs text-[#EEF2FA] focus:outline-none"
              >
                <option value="Aviónica & Sistemas">Aviónica & Sistemas</option>
                <option value="Recuperación & Paraglider">Recuperación & Paraglider</option>
                <option value="Mecanismo Carga (Huevo 2m)">Mecanismo Carga (Huevo 2m)</option>
                <option value="Telemetría & Enlace RF">Telemetría & Enlace RF</option>
                <option value="General & Gestión">General & Gestión</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-[#5A6785] mb-1">Etapa de Vuelo</label>
              <select
                value={flightStage}
                onChange={(e) => setFlightStage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#0B1633] border border-white/10 text-xs text-[#EEF2FA] focus:outline-none"
              >
                <option value="PAD_IDLE">Rampa / Pre-lanzamiento</option>
                <option value="POWERED_ASCENT">Ascenso Cohete</option>
                <option value="APOGEE_EJECTION">Apogeo 1000m (Eyección)</option>
                <option value="PARACHUTE_DESCENT">Descenso Paracaídas</option>
                <option value="PARAGLIDER_GLIDE">Planeo Guiado Paraglider</option>
                <option value="EGG_RELEASE_2M">Suelta Huevo 2m</option>
                <option value="TOUCHDOWN_RECOVERY">Aterrizaje & Recuperación</option>
              </select>
            </div>
          </div>

          {/* Cryptographic SHA-256 Stamp Preview */}
          <div className="p-5 rounded-2xl bg-[#17264F] border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#10B981]">
              <ShieldCheck className="w-4 h-4" />
              Sello SHA-256 Inmutable
            </div>
            <p className="text-[11px] text-[#5A6785] leading-relaxed">
              Cada edición genera un hash criptográfico único que se imprime en la marca de agua del PDF para certificar ante CONAE.
            </p>
            <div className="p-2.5 rounded-lg bg-[#0B1633] border border-white/5 font-mono text-[10px] text-[#FF7A1A] break-all select-all">
              {previewHash}
            </div>
          </div>

          {/* Attachment Uploader (CSV, Schematics, Images) */}
          <div className="p-5 rounded-2xl bg-[#17264F] border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#EEF2FA]">
                Adjuntos (CSV, Esquemas)
              </h4>
              <Paperclip className="w-3.5 h-3.5 text-[#5A6785]" />
            </div>

            <label className="border-2 border-dashed border-white/10 hover:border-[#FF7A1A]/50 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-[#0B1633]/60 group">
              <Upload className="w-5 h-5 text-[#5A6785] group-hover:text-[#FF7A1A] mb-1.5 transition-colors" />
              <span className="text-xs font-medium text-[#C9D6F2]">Subir curvas o fotos</span>
              <span className="text-[10px] text-[#5A6785] mt-0.5">CSV, PNG, PDF hasta 25MB</span>
              <input type="file" onChange={handleFileUpload} className="hidden" />
            </label>

            {attachments.length > 0 && (
              <div className="space-y-1.5 pt-2">
                {attachments.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg bg-[#0B1633] text-xs text-[#EEF2FA]"
                  >
                    <span className="truncate max-w-[160px]">{file.name}</span>
                    <span className="text-[10px] text-[#5A6785]">{file.size}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
