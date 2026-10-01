import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Global Prefix
  app.setGlobalPrefix('api');

  // 2. Cookie Parser middleware for HttpOnly JWT tokens
  app.use(cookieParser());

  // 3. Validation Pipe with transform & whitelist
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // 4. CORS configuration
  const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000,http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim());

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  });

  // 5. OpenAPI / Swagger Documentation Setup at /api/docs
  const config = new DocumentBuilder()
    .setTitle('AuSat Orbit - Technical API & Telemetry Contract')
    .setDescription(
      `Documentación técnica oficial de la API de **Orbit** para el equipo AuSat (Universidad Austral - CanSat CONAE 2026).
      \n\nIncluye endpoints públicos para la landing institucional (suscripción newsletter, telemetría general) y la suite privada para los 3 miembros técnicos autorizados (Calendario de Misión, Bitácoras en Markdown, Carga de Telemetría CSV y Sellado Criptográfico SHA-256).`,
    )
    .setVersion('1.0.0')
    .addTag('Authentication (Orbit Private System)', 'Acceso exclusivo con cookies HttpOnly seguras')
    .addTag('Mission Calendar (Orbit Private)', 'Cronograma, ensayos y entregas de hitos CONAE')
    .addTag('Reports & Telemetry (Orbit Private)', 'Gestión de informes y exportación con membrete oficial')
    .addTag('File Management (Orbit Telemetry & Schematics)', 'Almacenamiento de curvas CSV y planos')
    .addTag('Newsletter & Outreach (Public Landing)', 'Divulgación institucional')
    .addCookieAuth('orbit_access_token', {
      type: 'apiKey',
      in: 'cookie',
      name: 'orbit_access_token',
      description: 'Cookie de sesión HttpOnly generada tras login exitoso',
    })
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'AuSat Orbit API Docs - CanSat 2026',
    customCss: `
      .swagger-ui .topbar { background-color: #0B1633; border-bottom: 2px solid #FF7A1A; }
      .swagger-ui .topbar .topbar-wrapper img { content: url('https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/satellite.svg'); filter: invert(1); }
      .swagger-ui .btn.authorize { background-color: #FF7A1A; border-color: #FF7A1A; color: white; }
    `,
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 Orbit Backend running on: http://localhost:${port}/api`);
  console.log(`📚 Orbit Swagger OpenAPI Docs available on: http://localhost:${port}/api/docs`);
}

bootstrap();
