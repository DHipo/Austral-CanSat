'use client';

import React from 'react';
import { Printer, ArrowLeft, ShieldCheck, Check, Copy } from 'lucide-react';

export interface ReportPrintData {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  subsystem: string;
  flightStage?: string;
  contentMarkdown: string;
  objective?: string;
  findings?: string;
  conclusions?: string;
  nextSteps?: string;
  status: string;
  revisionHash: string;
  createdAt: string;
  author: {
    name: string;
    role: string;
    career?: string;
    email?: string;
  };
}

interface ReportPrintViewProps {
  report: ReportPrintData;
  onBack?: () => void;
}

export const ReportPrintView: React.FC<ReportPrintViewProps> = ({ report, onBack }) => {
  const [copiedHash, setCopiedHash] = React.useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyHash = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(report.revisionHash);
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    }
  };

  const formattedDate = new Date(report.createdAt).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-[#060C1E] text-[#EEF2FA] py-8 px-4 sm:px-6">
      
      {/* On-screen control bar (Hidden during print) */}
      <div className="no-print max-w-4xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#17264F] border border-white/10 backdrop-blur-md shadow-lg">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-[#C9D6F2] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al panel Orbit
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyHash}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#0B1633] text-[#C9D6F2] border border-white/10 hover:border-[#FF7A1A]/50 transition-colors"
            title="Copiar hash SHA-256 de integridad"
          >
            {copiedHash ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedHash ? 'Hash copiado' : 'Copiar Hash SHA-256'}
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-full bg-[#FF7A1A] hover:bg-[#D9620B] text-white shadow-md shadow-[#FF7A1A]/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Printer className="w-4 h-4" />
            Imprimir / Exportar PDF
          </button>
        </div>
      </div>

      {/* Official Printable Sheet Container */}
      <div className="orbit-print-sheet max-w-4xl mx-auto bg-white text-[#0B1633] rounded-2xl p-8 sm:p-14 shadow-2xl relative overflow-hidden print:p-0 print:m-0 print:rounded-none print:shadow-none">
        
        {/* Centered Watermark Overlay */}
        <div 
          aria-hidden="true"
          className="orbit-watermark-overlay select-none pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04] text-[80px] sm:text-[100px] font-black uppercase text-[#0B1633] -rotate-30 tracking-[0.2em] z-0"
        >
          AuSat Orbit
        </div>

        {/* Content Container (Layered above watermark) */}
        <div className="relative z-10">

          {/* Official Letterhead (Membrete Oficial) */}
          <div className="orbit-print-header flex items-start justify-between border-b-2 border-[#FF7A1A] pb-6 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl sm:text-3xl font-black text-[#0B1633] tracking-tight">
                  AuSat <span className="text-[#FF7A1A]">Orbit</span>
                </span>
                <span className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-[#0B1633] text-white">
                  Oficial
                </span>
              </div>
              <p className="text-xs uppercase tracking-wider text-[#5A6785] font-semibold">
                Facultad de Ingeniería • Universidad Austral
              </p>
              <p className="text-[11px] text-[#5A6785]">
                Certamen Aeroespacial CanSat 2026 • CONAE
              </p>
            </div>

            <div className="text-right">
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded bg-[#17264F] text-[#EEF2FA]">
                {report.status}
              </span>
              <p className="text-[11px] text-[#5A6785] mt-1.5 font-mono">
                DOC-REF: {report.id.toUpperCase()}
              </p>
            </div>
          </div>

          {/* Report Title & Header */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1633] tracking-tight leading-tight mb-2">
              {report.title}
            </h1>
            {report.subtitle && (
              <p className="text-base text-[#5A6785] font-normal leading-relaxed">
                {report.subtitle}
              </p>
            )}
          </div>

          {/* Engineering Metadata Panel */}
          <div className="orbit-print-meta rounded-xl bg-slate-50 border border-slate-200 p-5 mb-8 text-xs text-slate-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-6">
              <div>
                <span className="font-semibold text-slate-900 inline-block w-28">Responsable:</span>
                <span>{report.author.name} ({report.author.role})</span>
              </div>
              <div>
                <span className="font-semibold text-slate-900 inline-block w-28">Fecha de Registro:</span>
                <span>{formattedDate}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-900 inline-block w-28">Categoría:</span>
                <span className="font-medium text-[#FF7A1A]">{report.category}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-900 inline-block w-28">Subsistema:</span>
                <span>{report.subsystem}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-900 inline-block w-28">Etapa de Misión:</span>
                <span>{report.flightStage || 'N/A (General)'}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-900 inline-block w-28">Universidad:</span>
                <span>Universidad Austral</span>
              </div>
            </div>

            {/* Cryptographic SHA-256 Revision Hash */}
            <div className="mt-4 pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                Sello Criptográfico de Revisión (SHA-256):
              </div>
              <code className="font-mono text-[11px] bg-slate-900 text-slate-100 px-2.5 py-1 rounded select-all break-all">
                {report.revisionHash}
              </code>
            </div>
          </div>

          {/* Report Sections */}
          <div className="space-y-6 text-sm text-slate-800 leading-relaxed">
            
            {report.objective && (
              <div>
                <h2 className="text-xs uppercase tracking-wider font-bold text-[#0B1633] border-l-4 border-[#FF7A1A] pl-3 mb-2">
                  1. Objetivo Técnico y Alcance
                </h2>
                <div className="bg-slate-50/60 p-4 rounded-lg border border-slate-100 text-slate-700 whitespace-pre-line">
                  {report.objective}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-xs uppercase tracking-wider font-bold text-[#0B1633] border-l-4 border-[#FF7A1A] pl-3 mb-2">
                2. Desarrollo & Memoria de Ingeniería
              </h2>
              <div className="prose prose-slate max-w-none text-slate-800 whitespace-pre-line">
                {report.contentMarkdown}
              </div>
            </div>

            {report.findings && (
              <div>
                <h2 className="text-xs uppercase tracking-wider font-bold text-[#0B1633] border-l-4 border-[#FF7A1A] pl-3 mb-2">
                  3. Mediciones, Curvas y Hallazgos
                </h2>
                <div className="bg-slate-50/60 p-4 rounded-lg border border-slate-100 text-slate-700 whitespace-pre-line">
                  {report.findings}
                </div>
              </div>
            )}

            {report.conclusions && (
              <div>
                <h2 className="text-xs uppercase tracking-wider font-bold text-[#0B1633] border-l-4 border-[#FF7A1A] pl-3 mb-2">
                  4. Conclusiones de Ingeniería
                </h2>
                <div className="text-slate-700 whitespace-pre-line">
                  {report.conclusions}
                </div>
              </div>
            )}

            {report.nextSteps && (
              <div>
                <h2 className="text-xs uppercase tracking-wider font-bold text-[#0B1633] border-l-4 border-[#FF7A1A] pl-3 mb-2">
                  5. Plan de Acción y Hitos CONAE
                </h2>
                <div className="text-slate-700 whitespace-pre-line">
                  {report.nextSteps}
                </div>
              </div>
            )}

          </div>

          {/* Official Signatures Section for the 3 Austral Engineering Members */}
          <div className="mt-14 pt-8 border-t border-slate-200">
            <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 mb-8 text-center">
              Firmas de Aprobación Técnica • Equipo AuSat (Universidad Austral)
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div>
                <div className="h-14 flex items-end justify-center pb-2 font-serif italic text-slate-400">
                  B. D'Hipólito
                </div>
                <div className="border-t border-slate-400 pt-2 text-xs font-bold text-slate-900">
                  Bautista D'Hipólito
                </div>
                <div className="text-[11px] text-slate-500">
                  Líder de Proyecto & Sistemas
                </div>
              </div>

              <div>
                <div className="h-14 flex items-end justify-center pb-2 font-serif italic text-slate-400">
                  M. Fernández
                </div>
                <div className="border-t border-slate-400 pt-2 text-xs font-bold text-slate-900">
                  Mateo Fernández
                </div>
                <div className="text-[11px] text-slate-500">
                  Aviónica & Sensores
                </div>
              </div>

              <div>
                <div className="h-14 flex items-end justify-center pb-2 font-serif italic text-slate-400">
                  S. Rossi
                </div>
                <div className="border-t border-slate-400 pt-2 text-xs font-bold text-slate-900">
                  Sofía Rossi
                </div>
                <div className="text-[11px] text-slate-500">
                  Recuperación & Aerodinámica
                </div>
              </div>
            </div>
          </div>

          {/* Print Footer Note */}
          <div className="mt-10 pt-4 border-t border-slate-100 text-center text-[10px] text-slate-400">
            Documento técnico generado por la plataforma AuSat Orbit. Sello de tiempo y hash inmutables para el certamen CanSat CONAE 2026.
          </div>

        </div>
      </div>
    </div>
  );
};
