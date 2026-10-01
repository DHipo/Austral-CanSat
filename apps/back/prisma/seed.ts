import { PrismaClient, UserRole, EventCategory, ReportCategory, ReportStatus, FlightStage } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

const prisma = new PrismaClient();

function calculateRevisionHash(title: string, content: string, authorEmail: string): string {
  return crypto
    .createHash('sha256')
    .update(`${title}::${content}::${authorEmail}::v1.0.0`)
    .digest('hex');
}

async function main() {
  console.log('🚀 [AuSat Orbit] Initializing database seed...');

  // 1. Hash passwords with bcrypt
  const salt = await bcrypt.genSalt(10);
  const defaultPasswordHash = await bcrypt.hash('Orbit2026!AuSat', salt);

  // 2. Pre-seed the 3 authorized technical students from Universidad Austral
  const technicalUsers = [
    {
      email: 'bdhipolito@austral.edu.ar',
      name: "Bautista D'Hipólito",
      role: UserRole.LEAD,
      career: 'Ingeniería Informática (3er año)',
      subsystem: 'Arquitectura, Aviónica & Sistemas',
      passwordHash: await bcrypt.hash('Orbit2026!Lead', salt),
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      isAuthorizedTechnical: true,
    },
    {
      email: 'mfogliato@austral.edu.ar',
      name: 'María Paz Fogliato',
      role: UserRole.AVIONICS,
      career: 'Ingeniería Informática (2do año)',
      subsystem: 'Aviónica, Sensores & Hardware LoRa',
      passwordHash: await bcrypt.hash('Orbit2026!Avionics', salt),
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      isAuthorizedTechnical: true,
    },
    {
      email: 'jviani@austral.edu.ar',
      name: 'Joaquín Viani',
      role: UserRole.FLIGHT_DYNAMICS,
      career: 'Ingeniería Informática (1er año)',
      subsystem: 'Recuperación, Paraglider & Aerodinámica',
      passwordHash: await bcrypt.hash('Orbit2026!Dynamics', salt),
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
      isAuthorizedTechnical: true,
    },
  ];

  console.log('👤 Seeding 3 verified Universidad Austral technical users...');
  const seededUsers = [];
  for (const user of technicalUsers) {
    const upserted = await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        role: user.role,
        career: user.career,
        subsystem: user.subsystem,
        passwordHash: user.passwordHash,
        isAuthorizedTechnical: true,
      },
      create: user,
    });
    seededUsers.push(upserted);
    console.log(`  -> User ready: ${upserted.email} (${upserted.role})`);
  }

  const bautista = seededUsers[0];
  const mariaPaz = seededUsers[1];
  const joaquin = seededUsers[2];

  // 3. Pre-seed Mission Calendar Events
  console.log('📅 Seeding CanSat CONAE Mission Calendar Events...');
  const missionEvents = [
    {
      title: 'Entrega Informe PDR CONAE (Preliminary Design Review)',
      description: 'Envío formal del documento técnico PDR ante la comisión evaluadora de CONAE.',
      startDate: new Date('2026-06-15T18:00:00Z'),
      endDate: new Date('2026-06-15T23:59:00Z'),
      category: EventCategory.CONAE_DELIVERY,
      location: 'Plataforma Virtual CONAE',
      isMilestone: true,
      createdById: bautista.id,
    },
    {
      title: 'Ensayo Drop Test 30G & Estructura CanSat',
      description: 'Prueba de impacto y rigidez estructural cilíndrica con dummy de huevo (60g).',
      startDate: new Date('2026-06-28T14:00:00Z'),
      endDate: new Date('2026-06-28T18:00:00Z'),
      category: EventCategory.HARDWARE_TEST,
      location: 'Laboratorio de Materiales - Univ. Austral',
      isMilestone: false,
      createdById: mariaPaz.id,
    },
    {
      title: 'Prueba de Despliegue de Paraglider y Actuadores',
      description: 'Ensayo en túnel de viento y pruebas de deflexión con servos MG90S para control de descenso.',
      startDate: new Date('2026-07-08T10:00:00Z'),
      endDate: new Date('2026-07-08T16:00:00Z'),
      category: EventCategory.PARACHUTE_TEST,
      location: 'Campus Universidad Austral (Zona Abierta Pilar)',
      isMilestone: true,
      createdById: joaquin.id,
    },
    {
      title: 'Reunión Semanal de Sincronización Técnica AuSat',
      description: 'Revisión de avance en bus I2C, telemetría LoRa 915 MHz y calibración del barómetro BMP280.',
      startDate: new Date('2026-07-14T21:00:00Z'),
      endDate: new Date('2026-07-14T22:30:00Z'),
      category: EventCategory.MEETING,
      location: 'Meet Virtual AuSat',
      isMilestone: false,
      createdById: bautista.id,
    },
  ];

  for (const event of missionEvents) {
    await prisma.calendarEvent.create({
      data: event,
    });
  }

  // 4. Pre-seed Technical Reports & Telemetry Documentation
  console.log('📝 Seeding Technical Mission Reports...');
  const report1Content = `# AuSat CanSat 2026 - Arquitectura de Aviónica y Telemetría

## 1. Resumen Ejecutivo
Este informe técnico documenta el diseño preliminar del bus de telemetría y sensores para el CanSat AuSat de la Universidad Austral para la competencia CONAE 2026.

## 2. Subsistema de Sensores
- **Computadora de Vuelo:** ESP32-S3 Dual-Core Xtensa LX7 @ 240MHz.
- **IMU:** MPU-6050 (Acelerómetro 3 ejes ±16g, Giroscopio ±2000°/s).
- **Altímetro Barométrico:** BMP280 vía I2C a 400kHz.
- **Transceptor RF:** LoRa SX1262 a 915 MHz con potencia 100mW (normativa ENACOM).
- **Sensor de Proximidad de Suelo:** ToF VL53L0X para activación del mecanismo de liberación del huevo a 2.0 metros.

## 3. Matriz de Riesgos y Mitigaciones
| Riesgo | Severidad | Mitigación |
|---|---|---|
| Reset por vibración en ascenso | Alta | Capacitores de tántalo en rail de 3.3V y watchdog por hardware |
| Rotura del huevo en liberación | Crítica | Sistema de pistón con amortiguador de doble resorte progresivo |
| Pérdida de enlace RF | Media | Tasa de transmisión adaptativa a 1Hz con buffering local en memoria flash SPI |
`;

  const report1Hash = calculateRevisionHash('Arquitectura de Aviónica y Telemetría', report1Content, bautista.email);

  const report1 = await prisma.report.create({
    data: {
      title: 'Arquitectura de Aviónica, Sensores y Telemetría LoRa',
      subtitle: 'Especificación del sistema embebido ESP32-S3 y protocolo de enlace a 915 MHz',
      category: ReportCategory.INVESTIGATION,
      subsystem: 'Aviónica & Sistemas',
      flightStage: FlightStage.PAD_IDLE,
      contentMarkdown: report1Content,
      objective: 'Diseñar una plataforma de aviónica tolerante a fallos para la adquisición de telemetría y control de servos.',
      findings: 'El ESP32-S3 ofrece suficiente rendimiento para fusionar datos IMU con filtro de Kalman mientras modula paquetes LoRa a 1Hz.',
      conclusions: 'Arquitectura validada en banco de pruebas con tasa de error de paquete < 0.2% a 1.2 km de línea de vista.',
      nextSteps: 'Rutear PCB de 4 capas con plano de masa térmico.',
      status: ReportStatus.APPROVED,
      revisionHash: report1Hash,
      authorId: bautista.id,
      attachments: {
        create: [
          {
            fileName: 'telemetry_spec_v1.csv',
            originalName: 'telemetry_spec_v1.csv',
            mimeType: 'text/csv',
            sizeBytes: 14200,
            url: '/uploads/telemetry_spec_v1.csv',
          },
          {
            fileName: 'schematic_esp32_avionics.png',
            originalName: 'schematic_esp32_avionics.png',
            mimeType: 'image/png',
            sizeBytes: 420000,
            url: '/uploads/schematic_esp32_avionics.png',
          },
        ],
      },
    },
  });

  // 5. Pre-seed Newsletter Subscribers
  console.log('✉️ Seeding Newsletter Subscribers...');
  await prisma.newsletterSubscriber.upsert({
    where: { email: 'comunidad@austral.edu.ar' },
    update: {},
    create: {
      email: 'comunidad@austral.edu.ar',
      fullName: 'Facultad de Ingeniería - Univ. Austral',
      institution: 'Universidad Austral',
      confirmed: true,
    },
  });

  console.log('✅ [AuSat Orbit] Database seed successfully completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error during database seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
