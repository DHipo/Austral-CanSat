import { useState, useEffect } from 'react'
import { TelemetryPacket, MissionPhase } from '../types/mission'

export function useTelemetrySim(isLiveSimulating = true) {
  const [telemetry, setTelemetry] = useState<TelemetryPacket>({
    timestamp: new Date().toLocaleTimeString(),
    altitude: 845.2,
    velocity: -6.4,
    accelerationX: 0.12,
    accelerationY: -0.05,
    accelerationZ: -9.81,
    temperature: 14.8,
    pressure: 924.3,
    batteryLevel: 94,
    signalStrength: -68,
    paragliderDeployed: true,
    eggIntegrityPercent: 100,
    missionPhase: 'PARAGLIDER_ACTIVE',
    coordinates: {
      lat: -34.4528,
      lng: -58.8681
    }
  })

  const [history, setHistory] = useState<{ time: string; altitude: number; velocity: number }[]>([
    { time: '12:00:00', altitude: 0, velocity: 0 },
    { time: '12:00:30', altitude: 450, velocity: 65 },
    { time: '12:01:00', altitude: 1000, velocity: 12 },
    { time: '12:01:30', altitude: 920, velocity: -8 },
    { time: '12:02:00', altitude: 845, velocity: -6.4 }
  ])

  useEffect(() => {
    if (!isLiveSimulating) return

    const interval = setInterval(() => {
      setTelemetry((prev) => {
        // Minor dynamic jitter to simulate real IMU & barometer noise
        const altChange = prev.altitude > 5 ? - (0.4 + Math.random() * 0.3) : 0
        const newAlt = Math.max(0, +(prev.altitude + altChange).toFixed(1))
        const newVel = +(prev.velocity + (Math.random() * 0.4 - 0.2)).toFixed(1)
        const newTemp = +(14.8 + (Math.random() * 0.2 - 0.1)).toFixed(1)
        const newPressure = +(924 + (1000 - newAlt) * 0.11).toFixed(1)
        const nowStr = new Date().toLocaleTimeString()

        let phase: MissionPhase = prev.missionPhase
        if (newAlt <= 2.5 && newAlt > 0.5) {
          phase = 'EGG_DEPLOYMENT'
        } else if (newAlt <= 0.5) {
          phase = 'RECOVERED'
        } else if (newAlt > 500) {
          phase = 'PARAGLIDER_ACTIVE'
        }

        setHistory(prevHist => [
          ...prevHist.slice(-9),
          { time: nowStr, altitude: newAlt, velocity: newVel }
        ])

        return {
          ...prev,
          timestamp: nowStr,
          altitude: newAlt,
          velocity: newVel,
          temperature: newTemp,
          pressure: newPressure,
          accelerationX: +(Math.random() * 0.2 - 0.1).toFixed(2),
          accelerationY: +(Math.random() * 0.2 - 0.1).toFixed(2),
          accelerationZ: +(-9.81 + (Math.random() * 0.3 - 0.15)).toFixed(2),
          batteryLevel: Math.max(88, prev.batteryLevel - (Math.random() > 0.95 ? 1 : 0)),
          missionPhase: phase
        }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isLiveSimulating])

  return { telemetry, history, setTelemetry }
}
