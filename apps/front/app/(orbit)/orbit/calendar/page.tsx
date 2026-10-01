'use client';

import React from 'react';
import { MissionCalendar } from '../../../../components/orbit/MissionCalendar';

export default function OrbitCalendarPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#F5F5F7]">
          Calendario de Misión CanSat 2026
        </h1>
        <p className="text-sm sm:text-base text-[#C9D6F2] mt-2 font-normal">
          Planificación de ensayos de hardware, entregas oficiales CONAE, pruebas de paracaídas y reuniones semanales.
        </p>
      </div>

      <MissionCalendar />
    </div>
  );
}
