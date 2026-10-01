'use client';

import React from 'react';
import { ReportEditor } from '../../../../components/orbit/ReportEditor';

export default function OrbitReportsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#F5F5F7]">
          Reportes Técnicos & Telemetría
        </h1>
        <p className="text-sm sm:text-base text-[#C9D6F2] mt-2 font-normal">
          Registro formal de memorias de ingeniería, subida de curvas CSV, cálculo de sellos SHA-256 y exportación oficial con membrete y marca de agua.
        </p>
      </div>

      <ReportEditor />
    </div>
  );
}
