import React from 'react';
import { MissionCalendar } from '@/components/orbit/MissionCalendar';
import { PageHeader } from '@/components/orbit/ui';

export default function OrbitCalendarPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Planificación de misión"
        title="Calendario"
        description="Ensayos de hardware, entregas a la CONAE, pruebas de recuperación y reuniones del equipo."
      />
      <MissionCalendar />
    </div>
  );
}
