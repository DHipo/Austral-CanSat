import React from 'react'
import { TelemetryDashboard } from '../components/sections/TelemetryDashboard'
import { MissionStages } from '../components/sections/MissionStages'
import { Subsystems } from '../components/sections/Subsystems'
import { TelemetryPacket } from '../types/mission'

interface DashboardPageProps {
  telemetry: TelemetryPacket
  setTelemetry: React.Dispatch<React.SetStateAction<TelemetryPacket>>
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ 
  telemetry, 
  setTelemetry 
}) => {
  return (
    <div className="bg-[#090a0d] min-h-screen text-slate-200">
      
      {/* Live Telemetry Station */}
      <TelemetryDashboard 
        telemetry={telemetry} 
        setTelemetry={setTelemetry} 
      />

      {/* Flight Stages */}
      <MissionStages />

      {/* Engineering Subsystems */}
      <Subsystems />

    </div>
  )
}
