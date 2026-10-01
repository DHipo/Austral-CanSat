import React from 'react';
import { MissionCalendar } from '@/components/orbit/MissionCalendar';
import { Notice, PageHeader } from '@/components/orbit/ui';

export default function OrbitCalendarPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Planificación de misión"
        title="Calendario"
        description="Ensayos de hardware, entregas a la CONAE, pruebas de recuperación y reuniones del equipo."
      />
      <Notice>Eventos de ejemplo. La creación y edición llegan cuando el calendario se conecte a la API.</Notice>
      <MissionCalendar />
    </div>
  );
}
