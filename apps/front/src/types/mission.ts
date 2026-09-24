export type MissionPhase = 
  | 'STANDBY'
  | 'ASCENT'
  | 'APOGEE_EJECTION'
  | 'PARACHUTE_DESCENT'
  | 'PARAGLIDER_ACTIVE'
  | 'EGG_DEPLOYMENT'
  | 'RECOVERED'

export interface TelemetryPacket {
  timestamp: string
  altitude: number // meters
  velocity: number // m/s
  accelerationX: number
  accelerationY: number
  accelerationZ: number
  temperature: number // Celsius
  pressure: number // hPa
  batteryLevel: number // percentage
  signalStrength: number // dBm
  paragliderDeployed: boolean
  eggIntegrityPercent: number
  missionPhase: MissionPhase
  coordinates: {
    lat: number
    lng: number
  }
}

export interface TeamMember {
  name: string
  role: string
  subsystem: string
  bio: string
}

export interface MissionMilestone {
  stage: string
  targetAltitude: string
  description: string
  status: 'completed' | 'in-progress' | 'scheduled'
  iconName: string
}
