'use client';

import React from 'react';
import { ReportEditor } from '../../../../components/orbit/ReportEditor';

export default function OrbitReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#EEF2FA]">
          Reportes Técnicos & Telemetría
        </h1>
        <p className="text-xs sm:text-sm text-[#C9D6F2] mt-1">
          Registro formal de memorias de ingeniería, subida de curvas CSV, cálculo de sellos SHA-256 y exportación oficial con membrete y marca de agua.
        </p>
      </div>

      <ReportEditor />
    </div>
  );
}
