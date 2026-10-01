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
    <div className="space-y-8">
      
      {/* Top Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#17264F] to-[#0B1633] border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#10B981]">
              Sistema Operativo • Telemetría Enlace 915 MHz
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#EEF2FA]">
            Bienvenido al Centro de Control Orbit
          </h1>
          <p className="text-xs sm:text-sm text-[#C9D6F2] mt-1 max-w-xl">
            Gestión de telemetría, ensayos ambientales y documentación oficial para el equipo AuSat de la Universidad Austral en la competencia CanSat 2026.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/orbit/calendar"
            className="px-5 py-2.5 rounded-full bg-[#17264F] hover:bg-[#1E3268] text-white text-xs font-semibold border border-white/10 transition-colors"
          >
            Ver Calendario
          </Link>
          <Link
            href="/orbit/reports"
            className="px-5 py-2.5 rounded-full bg-[#FF7A1A] hover:bg-[#D9620B] text-white text-xs font-semibold shadow-md shadow-[#FF7A1A]/30 transition-all hover:scale-[1.02]"
          >
            Nuevo Reporte
          </Link>
        </div>
      </div>

      {/* Real-time Subsystem Status Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-[#17264F] border border-white/10 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#5A6785] uppercase tracking-wider">
              Computadora ESP32-S3
            </span>
            <Cpu className="w-4 h-4 text-[#10B981]" />
          </div>
          <div className="text-2xl font-bold text-[#EEF2FA]">240 MHz</div>
          <p className="text-[11px] text-[#10B981] mt-1 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            Doble núcleo activo • Bus I2C OK
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#17264F] border border-white/10 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#5A6785] uppercase tracking-wider">
              Enlace RF LoRa SX1262
            </span>
            <Radio className="w-4 h-4 text-[#06B6D4]" />
          </div>
          <div className="text-2xl font-bold text-[#EEF2FA]">915 MHz</div>
          <p className="text-[11px] text-[#C9D6F2] mt-1">Potencia 20 dBm (100 mW) ENACOM</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#17264F] border border-white/10 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#5A6785] uppercase tracking-wider">
              Mecanismo Huevo 2m
            </span>
            <Activity className="w-4 h-4 text-[#FF7A1A]" />
          </div>
          <div className="text-2xl font-bold text-[#EEF2FA]">ToF VL53L0X</div>
          <p className="text-[11px] text-[#FF7A1A] mt-1 font-medium">
            Calibrado para liberación a 2.0m
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#17264F] border border-white/10 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#5A6785] uppercase tracking-wider">
              Batería LiPo 2S
            </span>
            <ShieldCheck className="w-4 h-4 text-[#10B981]" />
          </div>
          <div className="text-2xl font-bold text-[#EEF2FA]">7.4 V • 98%</div>
          <p className="text-[11px] text-[#10B981] mt-1">BMS equilibrado • 850mAh</p>
        </div>

      </div>

      {/* Main Panels: Upcoming Events & Quick Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Next Milestones Panel */}
        <div className="p-6 rounded-3xl bg-[#17264F] border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#FF7A1A]" />
              <h3 className="text-base font-bold text-[#EEF2FA]">Próximos Hitos de Misión</h3>
            </div>
            <Link
              href="/orbit/calendar"
              className="text-xs text-[#FF7A1A] hover:underline flex items-center gap-1"
            >
              Ver todos <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-[#0B1633] border border-white/5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#06B6D4]/20 text-[#06B6D4]">
                  Entrega CONAE
                </span>
                <span className="text-xs text-[#5A6785]">15 Junio 2026</span>
              </div>
              <h4 className="text-sm font-bold text-[#EEF2FA]">Entrega Informe PDR CONAE</h4>
              <p className="text-xs text-[#C9D6F2]">
                Subida formal del documento preliminar con arquitectura y dimensionamiento.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0B1633] border border-white/5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FF7A1A]/20 text-[#FF7A1A]">
                  Ensayo de Hardware
                </span>
                <span className="text-xs text-[#5A6785]">28 Junio 2026</span>
              </div>
              <h4 className="text-sm font-bold text-[#EEF2FA]">Drop Test 30G y Ensayo Térmico</h4>
              <p className="text-xs text-[#C9D6F2]">
                Laboratorio de Materiales de la Universidad Austral.
              </p>
            </div>
          </div>
        </div>

        {/* Recent Reports Panel */}
        <div className="p-6 rounded-3xl bg-[#17264F] border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#FF7A1A]" />
              <h3 className="text-base font-bold text-[#EEF2FA]">Últimas Bitácoras Técnicas</h3>
            </div>
            <Link
              href="/orbit/reports"
              className="text-xs text-[#FF7A1A] hover:underline flex items-center gap-1"
            >
              Ver todas <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-[#0B1633] border border-white/5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#10B981]/20 text-[#10B981]">
                  Aprobado & Sellado
                </span>
                <span className="text-[10px] text-[#5A6785] font-mono">SHA-256 VERIFIED</span>
              </div>
              <h4 className="text-sm font-bold text-[#EEF2FA]">
                Arquitectura de Aviónica, Sensores y Telemetría LoRa
              </h4>
              <p className="text-xs text-[#C9D6F2]">
                Por Bautista D'Hipólito • Subsistema: Aviónica & Sistemas
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0B1633] border border-white/5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FF7A1A]/20 text-[#FF7A1A]">
                  En Revisión
                </span>
                <span className="text-[10px] text-[#5A6785] font-mono">REV-003</span>
              </div>
              <h4 className="text-sm font-bold text-[#EEF2FA]">
                Mecanismo de Liberación de Huevo a 2m y Amortiguación
              </h4>
              <p className="text-xs text-[#C9D6F2]">
                Por Sofía Rossi • Subsistema: Mecánica & Carga Crítica
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
