'use client';

import React from 'react';
import { MissionCalendar } from '../../../../components/orbit/MissionCalendar';

export default function OrbitCalendarPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#EEF2FA]">
          Calendario de Misión CanSat 2026
        </h1>
        <p className="text-xs sm:text-sm text-[#C9D6F2] mt-1">
          Planificación de ensayos de hardware, entregas oficiales CONAE, pruebas de paracaídas y reuniones semanales.
        </p>
      </div>

      <MissionCalendar />
    </div>
  );
}
