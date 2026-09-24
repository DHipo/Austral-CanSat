import React, { useState } from 'react'
import { 
  Download, 
  Egg, 
  Gauge, 
  MapPin, 
  Play, 
  Pause, 
  Radio, 
  ShieldCheck, 
  Thermometer, 
  Wind,
  Cpu
} from 'lucide-react'
import { TelemetryPacket, MissionPhase } from '../../types/mission'

interface TelemetryDashboardProps {
  telemetry: TelemetryPacket
  setTelemetry: React.Dispatch<React.SetStateAction<TelemetryPacket>>
}

export const TelemetryDashboard: React.FC<TelemetryDashboardProps> = ({ 
  telemetry, 
  setTelemetry 
}) => {
  const [isSimulating, setIsSimulating] = useState(true)

  const handlePhaseChange = (phase: MissionPhase, alt: number, vel: number) => {
    setTelemetry(prev => ({
      ...prev,
      missionPhase: phase,
      altitude: alt,
      velocity: vel,
      timestamp: new Date().toLocaleTimeString()
    }))
  }

  const exportTelemetryJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(telemetry, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute("href", dataStr)
    downloadAnchor.setAttribute("download", `orbit_telemetry_${Date.now()}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  return (
    <section id="telemetria" className="py-20 bg-[#030712] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6 border-b border-slate-800 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
              <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-semibold">
                ESTACIÓN DE CONTROL DE TIERRA
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
              Telemetría de Vuelo en Tiempo Real
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Flujo telemétrico de sensores de a bordo a 915 MHz. Monitoreo barométrico, inercial (IMU) y estado del huevo.
            </p>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsSimulating(!isSimulating)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                isSimulating 
                  ? 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30' 
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isSimulating ? 'Pausar Simulación' : 'Reanudar Simulación'}</span>
            </button>

            <button
              onClick={exportTelemetryJson}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span>Exportar JSON</span>
            </button>
          </div>
        </div>

        {/* Phase Simulation Selector Buttons */}
        <div className="mb-8 p-3 rounded-2xl glass-panel flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <span className="text-slate-400 font-semibold px-2">SIMULAR FASE:</span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handlePhaseChange('ASCENT', 650, 42)}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                telemetry.missionPhase === 'ASCENT' 
                  ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400' 
                  : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:border-slate-500'
              }`}
            >
              1. Ascenso Cohete
            </button>
            <button
              onClick={() => handlePhaseChange('PARACHUTE_DESCENT', 980, -9.5)}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                telemetry.missionPhase === 'PARACHUTE_DESCENT' 
                  ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400' 
                  : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:border-slate-500'
              }`}
            >
              2. Paracaídas (980m)
            </button>
            <button
              onClick={() => handlePhaseChange('PARAGLIDER_ACTIVE', 520, -5.8)}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                telemetry.missionPhase === 'PARAGLIDER_ACTIVE' 
                  ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400' 
                  : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:border-slate-500'
              }`}
            >
              3. Paraglider Guiado (520m)
            </button>
            <button
              onClick={() => handlePhaseChange('EGG_DEPLOYMENT', 2.0, -1.2)}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                telemetry.missionPhase === 'EGG_DEPLOYMENT' 
                  ? 'bg-amber-400 text-slate-950 font-bold border-amber-300' 
                  : 'bg-slate-900/80 text-amber-300 border-amber-800/60 hover:border-amber-600'
              }`}
            >
              4. Despliegue Huevo (2m)
            </button>
            <button
              onClick={() => handlePhaseChange('RECOVERED', 0, 0)}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                telemetry.missionPhase === 'RECOVERED' 
                  ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400' 
                  : 'bg-slate-900/80 text-emerald-300 border-emerald-800/60 hover:border-emerald-600'
              }`}
            >
              5. Aterrizado (0m)
            </button>
          </div>
        </div>

        {/* Primary Telemetry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          
          {/* Altitude Card */}
          <div className="rounded-2xl glass-panel p-5 border border-slate-800 relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-mono">ALTITUD BAROMÉTRICA</span>
              <Gauge className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold font-mono text-white">
                {telemetry.altitude.toFixed(1)}
              </span>
              <span className="text-sm font-mono text-cyan-400 font-semibold">metros</span>
            </div>
            {/* Visual Altitude Bar */}
            <div className="mt-4 w-full bg-slate-800/80 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-teal-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (telemetry.altitude / 1000) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
              <span>0m</span>
              <span>Apogeo: 1000m</span>
            </div>
          </div>

          {/* Descent Velocity Card */}
          <div className="rounded-2xl glass-panel p-5 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-mono">VELOCIDAD VERTICAL</span>
              <Wind className="w-4 h-4 text-teal-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className={`text-4xl font-extrabold font-mono ${telemetry.velocity < 0 ? 'text-teal-400' : 'text-cyan-300'}`}>
                {telemetry.velocity > 0 ? `+${telemetry.velocity}` : telemetry.velocity}
              </span>
              <span className="text-sm font-mono text-slate-400">m/s</span>
            </div>
            <p className="text-xs text-slate-400 mt-4 flex items-center gap-1.5 font-mono">
              <span className={`w-2 h-2 rounded-full ${telemetry.velocity < 0 ? 'bg-teal-400' : 'bg-amber-400'}`} />
              {telemetry.velocity < 0 ? 'Tasa de Descenso Estable' : 'Fase de Ascenso'}
            </p>
          </div>

          {/* Egg Payload Protection */}
          <div className="rounded-2xl glass-panel p-5 border border-amber-500/30 relative">
            <div className="flex items-center justify-between text-amber-300 mb-2">
              <span className="text-xs font-mono font-semibold">ESTADO DE LA CARGA (HUEVO)</span>
              <Egg className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold font-mono text-amber-300">
                {telemetry.eggIntegrityPercent}%
              </span>
              <span className="text-sm font-mono text-amber-400/80">INTEGRIDAD</span>
            </div>
            <p className="text-xs text-slate-300 mt-4 flex items-center gap-1.5 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Cápsula de impacto amortiguada</span>
            </p>
          </div>

          {/* Radio Signal & Battery */}
          <div className="rounded-2xl glass-panel p-5 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-mono">ENLACE RF & ENERGÍA</span>
              <Radio className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-1">
              <div>
                <p className="text-[10px] font-mono text-slate-400">BATERÍA LiPo</p>
                <p className="text-2xl font-bold font-mono text-emerald-400">
                  {telemetry.batteryLevel}%
                </p>
              </div>
              <div>
                <p className="text-[10px] font-mono text-slate-400">RSSI LoRa</p>
                <p className="text-2xl font-bold font-mono text-cyan-300">
                  {telemetry.signalStrength} <span className="text-xs text-slate-400">dBm</span>
                </p>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-3 font-mono">
              Tensión: 3.95V • Frecuencia: 915 MHz
            </p>
          </div>

        </div>

        {/* Secondary Metrics (IMU, Atmosphere, GPS) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* IMU 3-Axis Acceleration */}
          <div className="rounded-2xl glass-panel p-5 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white font-mono uppercase">
                  Acelerómetro Inercial (IMU)
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">MPU-6050</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <p className="text-[10px] font-mono text-slate-400 mb-1">EJE X</p>
                <p className="text-lg font-bold font-mono text-cyan-300">
                  {telemetry.accelerationX} <span className="text-[10px] text-slate-500">g</span>
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <p className="text-[10px] font-mono text-slate-400 mb-1">EJE Y</p>
                <p className="text-lg font-bold font-mono text-cyan-300">
                  {telemetry.accelerationY} <span className="text-[10px] text-slate-500">g</span>
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <p className="text-[10px] font-mono text-slate-400 mb-1">EJE Z</p>
                <p className="text-lg font-bold font-mono text-teal-300">
                  {telemetry.accelerationZ} <span className="text-[10px] text-slate-500">g</span>
                </p>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-4 font-mono">
              Fuerza G total estimada: 1.02 G (Dentro del umbral de seguridad para el huevo)
            </p>
          </div>

          {/* Environmental Sensors */}
          <div className="rounded-2xl glass-panel p-5 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-teal-400" />
                <h3 className="text-sm font-bold text-white font-mono uppercase">
                  Sensores Ambientales
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">BMP280</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <p className="text-[10px] font-mono text-slate-400 mb-1">TEMPERATURA</p>
                <p className="text-xl font-bold font-mono text-white">
                  {telemetry.temperature} <span className="text-xs text-slate-400">°C</span>
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <p className="text-[10px] font-mono text-slate-400 mb-1">PRESIÓN</p>
                <p className="text-xl font-bold font-mono text-white">
                  {telemetry.pressure} <span className="text-xs text-slate-400">hPa</span>
                </p>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-4 font-mono">
              Presión a nivel del mar calibrada: 1013.25 hPa
            </p>
          </div>

          {/* GPS Positioning */}
          <div className="rounded-2xl glass-panel p-5 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white font-mono uppercase">
                  Ubicación & GPS
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">FIX 3D (11 SAT)</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-900/80 font-mono text-xs">
                <span className="text-slate-400">LATITUD</span>
                <span className="text-white font-semibold">{telemetry.coordinates.lat}° S</span>
              </div>
              <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-900/80 font-mono text-xs">
                <span className="text-slate-400">LONGITUD</span>
                <span className="text-white font-semibold">{telemetry.coordinates.lng}° W</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-3 font-mono">
              Zona de lanzamiento: Campus Universidad Austral, Pilar.
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}
