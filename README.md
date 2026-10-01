# AuSat Orbit — Plataforma Aeroespacial & Centro de Control CanSat 2026

![AuSat Orbit Banner](https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/satellite.svg)

> **AuSat** es el equipo representativo de la **Facultad de Ingeniería de la Universidad Austral** para el certamen aeroespacial **CanSat 2026**, organizado por la **CONAE** (Comisión Nacional de Actividades Espaciales, República Argentina).

**Orbit** es la plataforma tecnológica integral del equipo, dividida en dos capas funcionales:
1. **Landing Institucional Pública:** Divulgación científica, especificaciones del CanSat, fases de la misión CONAE y suscripción a novedades.
2. **Sistema Privado de Gestión Técnica ("Orbit"):** Centro de control restringido a los 3 ingenieros de la Universidad Austral para cronograma de hitos, ensayos de hardware y registro de bitácoras con sellado criptográfico SHA-256 y membrete oficial para exportación a PDF.

---

## 1. Stack Tecnológico & Arquitectura

| Capa | Tecnologías Clave | Responsabilidad |
|---|---|---|
| **Monorepo** | NPM / PNPM Workspaces, Docker, Docker Compose | Orquestación unificada de dependencias y despliegue |
| **Frontend** (`apps/front`) | Next.js (App Router), Tailwind CSS, Framer Motion, Lucide React | Landing pública y suite técnica Orbit (Apple HIG Aesthetic) |
| **Backend** (`apps/back`) | NestJS, Prisma ORM, JWT, Cookies HttpOnly, Multer, Swagger | API REST modular, autenticación estricta, subida de archivos y motor PDF |
| **Persistencia** | PostgreSQL 16 Alpine, Volúmenes Docker | Almacenamiento relacional y persistencia de curvas/esquemas |
| **Paquete Compartido** (`packages/shared`) | TypeScript 5.7 (ES2022 / Node16) | DTOs, Enums, Interfaces y contratos de telemetría comunes |
| **Documentación & Acuerdos** (`docs/`) | Markdown, Plantillas de Investigación, Contratos | Acuerdos de equipo, requisitos 2025/2026 y metodologías de ensayo |

---

## 2. Diagrama de Arquitectura del Sistema (Mermaid.js)

```mermaid
graph TB
  subgraph ClientLayer ["Capa de Clientes & Navegación"]
    PublicUser["Visitante / Institución\n(Público)"]
    AustralTeam["3 Ingenieros Univ. Austral\n(Bautista, Mateo, Sofía)"]
  end

  subgraph FrontendApp ["apps/front (Next.js 15 App Router)"]
    PublicRoutes["app/(public)/*\n• Hero Cinematográfico\n• Ficha CanSat & CONOP\n• Equipo Austral\n• Newsletter"]
    OrbitRoutes["app/(orbit)/*\n• Calendario de Misión\n• Bitácoras & Ensayos\n• CSS Print / PDF Export"]
    OrbitAuthModal["Orbit Auth Modal\n(Cookies HttpOnly)"]
  end

  subgraph BackendApp ["apps/back (NestJS Modular API)"]
    Gateway["Reverse Proxy / CORS / Cookie Parser\nPrefix: /api"]
    SwaggerDocs["Swagger / OpenAPI\n/api/docs"]
    
    subgraph Modules ["Módulos de Dominio"]
      AuthMod["AuthModule\nStrict Seed Guard"]
      CalMod["CalendarModule\nFiltros por Etiquetas"]
      RepMod["ReportsModule\nSHA-256 Sello & Print Engine"]
      FileMod["FilesModule\nMulter Uploads"]
      NewsMod["NewsletterModule\nSuscripciones"]
    end
    
    PrismaService["Prisma ORM Client"]
  end

  subgraph PersistenceLayer ["Persistencia & Almacenamiento"]
    PostgresDB[("PostgreSQL 16\norbit-db")]
    UploadsVolume[("Docker Volume\norbit_uploads\n(CSVs, Esquemas, Fotos)")]
  end

  PublicUser -->|HTTP GET /| PublicRoutes
  PublicRoutes -->|POST /api/newsletter/subscribe| NewsMod
  
  AustralTeam -->|Login| OrbitAuthModal
  OrbitAuthModal -->|POST /api/auth/login\n(Set HttpOnly Cookie)| AuthMod
  
  AustralTeam -->|Sesión Autenticada| OrbitRoutes
  OrbitRoutes -->|GET / POST /api/calendar| CalMod
  OrbitRoutes -->|GET / POST /api/reports| RepMod
  OrbitRoutes -->|POST /api/files/upload| FileMod
  OrbitRoutes -->|GET /api/reports/:id/export-pdf| RepMod
  
  AuthMod & CalMod & RepMod & FileMod & NewsMod --> PrismaService
  FileMod --> UploadsVolume
  PrismaService --> PostgresDB
```

---

## 3. Requisitos Mínimos del Sistema

- **Node.js:** Versión `>= 20.0.0` (Recomendado: `22.x` o `24.x LTS`).
- **NPM:** `>= 10.0.0` (o **PNPM** `>= 9.0.0`).
- **Docker & Docker Compose:** Versión `>= 24.0.0` (para despliegue con base de datos).

---

## 4. Guía Quickstart (Paso a Paso)

### 4.1 Clonar el repositorio y configurar variables de entorno
```bash
git clone https://github.com/DHipo/Austral-CanSat.git
cd Austral-CanSat

# Copiar plantilla de entorno
cp .env.example .env
```

### 4.2 Compilar paquetes compartidos e instalar dependencias
```bash
# Compilar contratos y DTOs comunes
npm run build:shared

# Instalar dependencias en todo el monorepo
npm install
```

### 4.3 Opción A: Despliegue Completo con Docker Compose (Recomendado)
Levanta la base de datos PostgreSQL, el backend NestJS y el frontend Next.js en red aislada:
```bash
# Iniciar servicios con healthcheck
docker compose up -d --build

# Verificar que los contenedores estén saludables
docker compose ps
```
Servicios disponibles:
- **Frontend Institucional & Orbit:** [http://localhost:3000](http://localhost:3000)
- **API Backend:** [http://localhost:3001/api](http://localhost:3001/api)
- **Documentación Swagger / OpenAPI:** [http://localhost:3001/api/docs](http://localhost:3001/api/docs)

### 4.4 Opción B: Ejecución en Modo Desarrollo Local
Si deseas ejecutar la base de datos en Docker pero correr front y back en caliente:
```bash
# 1. Levantar solo la base de datos
docker compose up -d orbit-db

# 2. Generar cliente Prisma y sembrar la base de datos
npm run db:generate
npm run db:migrate
npm run db:seed

# 3. Iniciar Backend en una terminal
npm run dev:back

# 4. Iniciar Frontend en otra terminal
npm run dev:front
```

---

## 5. Usuarios Técnicos Sembrados (Acceso a Orbit)

El script `apps/back/prisma/seed.ts` inicializa a los 3 integrantes oficiales de la Universidad Austral con contraseñas encriptadas mediante `bcrypt` y autorización estricta:

| Integrante | Rol Técnico | Email Institucional | Contraseña Inicial |
|---|---|---|---|
| **Bautista D'Hipólito** | Líder de Proyecto & Sistemas | `bdhipolito@austral.edu.ar` | `Orbit2026!Lead` |
| **Mateo Fernández** | Aviónica, Sensores & LoRa | `mfernandez@austral.edu.ar` | `Orbit2026!Hardware` |
| **Sofía Rossi** | Recuperación, Paraglider & Carga | `srossi@austral.edu.ar` | `Orbit2026!Dynamics` |

---

## 6. Scripts Disponibles en el Root Workspace

| Script | Comando | Descripción |
|---|---|---|
| `npm run dev` | `npm run dev --workspace=@orbit/front` | Inicia el frontend de desarrollo |
| `npm run dev:back` | `npm run start:dev --workspace=@orbit/back` | Inicia el servidor NestJS con auto-reload |
| `npm run dev:all` | `npm run dev --workspaces` | Inicia frontend y backend en paralelo |
| `npm run build:shared` | `npx -y typescript -p packages/shared` | Compila el paquete TypeScript `@orbit/shared` a `./dist` |
| `npm run build` | `npm run build:shared && back && front` | Compila todo el monorepo para producción |
| `npm run db:generate` | `prisma generate` | Genera los tipos de Prisma Client |
| `npm run db:migrate` | `prisma migrate dev` | Aplica migraciones a la base de datos local |
| `npm run db:seed` | `ts-node prisma/seed.ts` | Siembra los 3 usuarios, eventos e informes de ejemplo |
| `npm run prisma:studio`| `prisma studio` | Abre la interfaz gráfica de exploración de datos |
| `npm run docker:up` | `docker compose up -d --build` | Levanta el entorno multi-contenedor |
| `npm run docker:down`| `docker compose down` | Apaga los contenedores y preserva volúmenes |

---

## 7. Contrato de Datos & Especificación de Telemetría

### 7.1 Esquema de Reportes Técnicos
Cada reporte técnico sellado incluye:
- `id`: Identificador alfanumérico único.
- `title` & `subtitle`: Descripción formal del ensayo o hito.
- `category`: `INVESTIGATION`, `PDR_CDR`, `MEETING_MINUTES`, `ENVIRONMENTAL_TEST`, `TELEMETRY_LOG`.
- `flightStage`: Etapa CONAE vinculada (`PAD_IDLE`, `APOGEE_EJECTION`, `EGG_RELEASE_2M`, etc.).
- `contentMarkdown`: Memoria de cálculo y desarrollo experimental.
- `revisionHash`: Sello de integridad criptográfica calculado con `SHA-256(title + content + author + timestamp)`.
- `attachments`: Listado de curvas CSV, esquemas circuitales o capturas de osciloscopio vinculadas.

### 7.2 Límites de Carga y Formatos Permitidos
- **Formatos admitidos:** `.csv`, `.txt`, `.png`, `.jpg`, `.pdf`, `.json`.
- **Límite máximo por archivo:** 25 MB.
- **Directorio de almacenamiento:** Volumen Docker persistente `orbit_uploads` (`/app/apps/back/uploads`).
