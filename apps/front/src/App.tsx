import React from 'react'
import { Navbar } from './components/layout/Navbar'
import { Hero } from './components/sections/Hero'
import { MissionStages } from './components/sections/MissionStages'
import { TelemetryDashboard } from './components/sections/TelemetryDashboard'
import { Subsystems } from './components/sections/Subsystems'
import { TeamSection } from './components/sections/TeamSection'
import { Footer } from './components/layout/Footer'
import { useTelemetrySim } from './hooks/useTelemetrySim'

export const App: React.FC = () => {
  const { telemetry, setTelemetry } = useTelemetrySim(true)

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero telemetry={telemetry} />

        {/* Mission Flight Phases */}
        <MissionStages />

        {/* Live Interactive Telemetry Station */}
        <TelemetryDashboard 
          telemetry={telemetry} 
          setTelemetry={setTelemetry} 
        />

        {/* Satellite Engineering Subsystems */}
        <Subsystems />

        {/* Team AuSat & Mission Directives */}
        <TeamSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
