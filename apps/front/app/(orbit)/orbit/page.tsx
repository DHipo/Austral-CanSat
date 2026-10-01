'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  FileText, 
  Radio, 
  Cpu, 
  ShieldCheck, 
  ArrowUpRight, 
  Activity
} from 'lucide-react';

export default function OrbitDashboardPage() {
  return (
    <div className="space-y-10">
      
      {/* Top Welcome Banner */}
      <div className="rounded-[32px] bg-gradient-to-r from-[#17264F]/80 via-[#0B1633] to-[#070B18] border border-white/15 p-8 sm:p-10 backdrop-blur-2xl shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
            <span className="apple-label-small text-[#10B981]">
              Sistema Operativo • Telemetría Enlace 915 MHz
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F5F7]">
            Centro de Control Orbit
          </h1>
          <p className="text-sm sm:text-base text-[#C9D6F2] mt-2 max-w-2xl font-normal leading-relaxed">
            Gestión de telemetría, ensayos ambientales y documentación oficial para el equipo AuSat de la Universidad Austral en la competencia CanSat 2026.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/orbit/calendar"
            className="px-6 py-3 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-white text-xs font-bold border border-white/15 transition-all"
          >
            Ver Calendario
          </Link>
          <Link
            href="/orbit/reports"
            className="px-6 py-3 rounded-full bg-[#FF7A1A] hover:bg-[#D9620B] text-white text-xs font-bold shadow-lg shadow-[#FF7A1A]/30 transition-all hover:scale-[1.03]"
          >
            Nuevo Reporte
          </Link>
        </div>
      </div>

      {/* Real-time Subsystem Status Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="p-6 rounded-[28px] bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all shadow-md">
          <div className="flex items-center justify-between mb-3">
            <span className="apple-label-small text-[#86868B]">
              Computadora ESP32-S3
            </span>
            <Cpu className="w-5 h-5 text-[#10B981]" />
          </div>
          <div className="text-3xl font-bold text-[#F5F5F7]">240 MHz</div>
          <p className="text-xs text-[#10B981] mt-2 font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            Doble núcleo activo • Bus I2C OK
          </p>
        </div>

        <div className="p-6 rounded-[28px] bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all shadow-md">
          <div className="flex items-center justify-between mb-3">
            <span className="apple-label-small text-[#86868B]">
              Enlace RF LoRa SX1262
            </span>
            <Radio className="w-5 h-5 text-[#06B6D4]" />
          </div>
          <div className="text-3xl font-bold text-[#F5F5F7]">915 MHz</div>
          <p className="text-xs text-[#C9D6F2] mt-2 font-medium">Potencia 20 dBm (100 mW) ENACOM</p>
        </div>

        <div className="p-6 rounded-[28px] bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all shadow-md">
          <div className="flex items-center justify-between mb-3">
            <span className="apple-label-small text-[#86868B]">
              Mecanismo Huevo 2m
            </span>
            <Activity className="w-5 h-5 text-[#FF7A1A]" />
          </div>
          <div className="text-3xl font-bold text-[#F5F5F7]">ToF VL53L0X</div>
          <p className="text-xs text-[#FF7A1A] mt-2 font-medium">
            Calibrado para liberación a 2.0m
          </p>
        </div>

        <div className="p-6 rounded-[28px] bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all shadow-md">
          <div className="flex items-center justify-between mb-3">
            <span className="apple-label-small text-[#86868B]">
              Batería LiPo 2S
            </span>
            <ShieldCheck className="w-5 h-5 text-[#10B981]" />
          </div>
          <div className="text-3xl font-bold text-[#F5F5F7]">7.4 V • 98%</div>
          <p className="text-xs text-[#10B981] mt-2 font-medium">BMS equilibrado • 850mAh</p>
        </div>

      </div>

      {/* Main Panels: Upcoming Events & Quick Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Next Milestones Panel */}
        <div className="p-8 rounded-[32px] bg-gradient-to-b from-[#17264F]/50 to-[#070B18] border border-white/12 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-5 h-5 text-[#FF7A1A]" />
              <h3 className="text-lg font-bold text-[#F5F5F7]">Próximos Hitos de Misión</h3>
            </div>
            <Link
              href="/orbit/calendar"
              className="text-xs font-bold text-[#FF7A1A] hover:underline flex items-center gap-1"
            >
              Ver todos <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-1.5 hover:border-white/15 transition-colors">
              <div className="flex items-center justify-between">
                <span className="apple-label-small text-[#06B6D4] text-[10px]">
                  Entrega CONAE
                </span>
                <span className="text-xs text-[#86868B]">15 Junio 2026</span>
              </div>
              <h4 className="text-base font-bold text-[#F5F5F7]">Entrega Informe PDR CONAE</h4>
              <p className="text-xs text-[#C9D6F2] leading-relaxed">
                Subida formal del documento preliminar con arquitectura y dimensionamiento.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-1.5 hover:border-white/15 transition-colors">
              <div className="flex items-center justify-between">
                <span className="apple-label-small text-[#FF7A1A] text-[10px]">
                  Ensayo de Hardware
                </span>
                <span className="text-xs text-[#86868B]">28 Junio 2026</span>
              </div>
              <h4 className="text-base font-bold text-[#F5F5F7]">Drop Test 30G y Ensayo Térmico</h4>
              <p className="text-xs text-[#C9D6F2] leading-relaxed">
                Laboratorio de Materiales de la Universidad Austral.
              </p>
            </div>
          </div>
        </div>

        {/* Recent Reports Panel */}
        <div className="p-8 rounded-[32px] bg-gradient-to-b from-[#17264F]/50 to-[#070B18] border border-white/12 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-[#FF7A1A]" />
              <h3 className="text-lg font-bold text-[#F5F5F7]">Últimas Bitácoras Técnicas</h3>
            </div>
            <Link
              href="/orbit/reports"
              className="text-xs font-bold text-[#FF7A1A] hover:underline flex items-center gap-1"
            >
              Ver todas <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-1.5 hover:border-white/15 transition-colors">
              <div className="flex items-center justify-between">
                <span className="apple-label-small text-[#10B981] text-[10px]">
                  Aprobado & Sellado
                </span>
                <span className="text-[10px] text-[#86868B] font-mono">SHA-256 VERIFIED</span>
              </div>
              <h4 className="text-base font-bold text-[#F5F5F7]">
                Arquitectura de Aviónica, Sensores y Telemetría LoRa
              </h4>
              <p className="text-xs text-[#C9D6F2] leading-relaxed">
                Por Bautista D'Hipólito • Subsistema: Aviónica & Sistemas
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-1.5 hover:border-white/15 transition-colors">
              <div className="flex items-center justify-between">
                <span className="apple-label-small text-[#FF7A1A] text-[10px]">
                  En Revisión
                </span>
                <span className="text-[10px] text-[#86868B] font-mono">REV-003</span>
              </div>
              <h4 className="text-base font-bold text-[#F5F5F7]">
                Mecanismo de Liberación de Huevo a 2m y Amortiguación
              </h4>
              <p className="text-xs text-[#C9D6F2] leading-relaxed">
                Por Sofía Rossi • Subsistema: Mecánica & Carga Crítica
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
