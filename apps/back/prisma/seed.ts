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
  console.log('[AuSat Orbit] Initializing database seed...');

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

  console.log('Seeding 3 verified Universidad Austral technical users...');
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
  console.log('Seeding CanSat CONAE Mission Calendar Events...');
  // Eventos de ejemplo del plan del equipo (sin datos técnicos inventados).
  const missionEvents = [
    {
      title: 'Reunión semanal del equipo',
      description: 'Avance por subsistema y bloqueos de la semana.',
      startDate: new Date('2026-10-06T21:00:00-03:00'),
      endDate: new Date('2026-10-06T22:00:00-03:00'),
      category: EventCategory.MEETING,
      location: 'Meet',
      isMilestone: false,
      createdById: bautista.id,
    },
    {
      title: 'Prueba de autonomía con celdas 18650',
      description: 'Descarga continua del banco de baterías con carga simulada para validar 2 h de operación.',
      startDate: new Date('2026-10-10T15:00:00-03:00'),
      endDate: new Date('2026-10-10T18:00:00-03:00'),
      category: EventCategory.HARDWARE_TEST,
      location: 'Laboratorio - Universidad Austral',
      isMilestone: false,
      createdById: mariaPaz.id,
    },
    {
      title: 'Reunión semanal del equipo',
      startDate: new Date('2026-10-13T21:00:00-03:00'),
      endDate: new Date('2026-10-13T22:00:00-03:00'),
      category: EventCategory.MEETING,
      location: 'Meet',
      isMilestone: false,
      createdById: bautista.id,
    },
    {
      title: 'Drop test (~30 G)',
      description: 'Ensayo de caída para verificar anclajes y montaje de componentes. Grabar en video.',
      startDate: new Date('2026-10-24T10:00:00-03:00'),
      endDate: new Date('2026-10-24T13:00:00-03:00'),
      category: EventCategory.HARDWARE_TEST,
      location: 'Laboratorio - Universidad Austral',
      isMilestone: false,
      createdById: joaquin.id,
    },
    {
      title: 'Primer ensayo de despliegue del paraglider',
      description: 'Suelta desde altura con payload de masa equivalente.',
      startDate: new Date('2026-11-07T09:00:00-03:00'),
      endDate: new Date('2026-11-07T13:00:00-03:00'),
      category: EventCategory.PARACHUTE_TEST,
      location: 'Campus Pilar',
      isMilestone: true,
      createdById: joaquin.id,
    },
    {
      title: 'Entrega PDR (Preliminary Design Review)',
      description: 'Documento de diseño preliminar para la CONAE.',
      startDate: new Date('2026-11-20T23:59:00-03:00'),
      endDate: new Date('2026-11-20T23:59:00-03:00'),
      category: EventCategory.CONAE_DELIVERY,
      location: 'Plataforma CONAE',
      isMilestone: true,
      createdById: bautista.id,
    },
    {
      title: 'Integración en banco: aviónica + energía',
      startDate: new Date('2026-11-28T14:00:00-03:00'),
      endDate: new Date('2026-11-28T19:00:00-03:00'),
      category: EventCategory.INTEGRATION,
      location: 'Laboratorio - Universidad Austral',
      isMilestone: false,
      createdById: mariaPaz.id,
    },
  ];

  // Idempotente: volver a correr el seed no duplica eventos.
  for (const event of missionEvents) {
    const exists = await prisma.calendarEvent.findFirst({
      where: { title: event.title, startDate: event.startDate },
    });
    if (!exists) {
      await prisma.calendarEvent.create({ data: event });
    }
  }

  // 4. Pre-seed Technical Reports & Telemetry Documentation
  console.log('Seeding Technical Mission Reports...');
  // Informes de ejemplo del equipo (sin datos técnicos inventados).
  const missionReports = [
    {
      title: 'Resumen de la competencia CanSat 2025',
      subtitle: 'Fases, entregables, requisitos y ensayos obligatorios',
      category: ReportCategory.INVESTIGATION,
      status: ReportStatus.APPROVED,
      subsystem: 'General & Gestión',
      author: bautista,
      contentMarkdown: [
        '## Concepto de operaciones',
        '',
        '1. Ascenso como nariz del cohete.',
        '2. Separación en apogeo con paracaídas (**≤ 15 m/s**).',
        '3. Liberación del payload al 80% del apogeo con paraglider (~5 m/s).',
        '4. Liberación del huevo a **2 m** del suelo.',
        '5. Baliza audible al aterrizar.',
      ].join('\n'),
      objective: 'Entender qué se va a pedir, los entregables, las fases y los ensayos necesarios.',
      findings:
        'Masa 1000 g ± 10 g. Ø136 mm × 250 mm. Operación ≥ 2 h, sin LiPo. Telemetría ASCII a 1 Hz por XBee. Ensayos: drop, térmico, vibración y vacío.',
      conclusions:
        'El foco está en el control del paraglider y la entrega del huevo. El margen de masa obliga a controlarla desde el diseño.',
      nextSteps: 'Analizar CanSats de años anteriores y empezar la investigación por subsistema.',
    },
    {
      title: 'Presupuesto de masa preliminar',
      subtitle: 'Objetivo 1000 g ± 10 g (CanSat + contenedor)',
      category: ReportCategory.PDR_CDR,
      status: ReportStatus.DRAFT,
      subsystem: 'Estructura & Mecánica',
      author: mariaPaz,
      contentMarkdown: 'Primer reparto de masa por subsistema. Se completa a medida que se eligen componentes.',
    },
    {
      title: 'Mecanismos de liberación del huevo a 2 m',
      subtitle: 'Relevamiento de soluciones de equipos anteriores',
      category: ReportCategory.INVESTIGATION,
      status: ReportStatus.IN_REVIEW,
      subsystem: 'Mecanismo de carga (huevo)',
      flightStage: FlightStage.EGG_RELEASE_2M,
      author: joaquin,
      contentMarkdown:
        'Se relevan mecanismos de retención y liberación (servo, electroimán, hilo térmico) y cómo detectar los 2 m sobre el suelo.',
      objective: 'Definir candidatos para el mecanismo de liberación y el sensor de altura de activación.',
    },
    {
      title: 'Selección de celdas 18650 y autonomía de 2 h',
      subtitle: 'Alternativas a LiPo (prohibidas por reglamento)',
      category: ReportCategory.INVESTIGATION,
      status: ReportStatus.IN_REVIEW,
      subsystem: 'Energía',
      author: mariaPaz,
      contentMarkdown:
        'El reglamento prohíbe baterías LiPo y exige al menos 2 h de operación. Se comparan celdas 18650 en empaque metálico según capacidad, masa y corriente máxima.',
      objective: 'Elegir una configuración de celdas que cubra 2 h con margen y respete el presupuesto de masa.',
      findings: 'Consumo estimado a validar en banco.',
    },
    {
      title: 'Minuta reunión semanal #12',
      subtitle: 'Estado de subsistemas y próximos ensayos',
      category: ReportCategory.MEETING_MINUTES,
      status: ReportStatus.DRAFT,
      subsystem: 'General & Gestión',
      author: joaquin,
      contentMarkdown: [
        'Asistentes: Bautista, María Paz, Joaquín.',
        '',
        '- Se revisó el presupuesto de masa preliminar.',
        '- Se definió fecha tentativa para el drop test.',
        '- Pendiente: cotizar celdas 18650.',
      ].join('\n'),
      nextSteps: 'Cerrar fecha del drop test y comprar celdas para la prueba de autonomía.',
    },
  ];

  // Idempotente: volver a correr el seed no duplica informes.
  for (const { author, ...report } of missionReports) {
    const exists = await prisma.report.findFirst({ where: { title: report.title } });
    if (!exists) {
      await prisma.report.create({
        data: {
          ...report,
          revisionHash: calculateRevisionHash(report.title, report.contentMarkdown, author.email),
          authorId: author.id,
        },
      });
    }
  }

  // 5. Pre-seed Newsletter Subscribers
  console.log('Seeding Newsletter Subscribers...');
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

  console.log('[AuSat Orbit] Database seed successfully completed!');
}

main()
  .catch((e) => {
    console.error('Error during database seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
