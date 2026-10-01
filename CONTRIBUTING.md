# Guía de Contribución & Buenas Prácticas — AuSat Orbit

Este documento establece las directrices de ingeniería, convenciones de código y políticas de integración continua para el equipo de desarrollo de **AuSat** (Universidad Austral) en la plataforma **Orbit** (CanSat CONAE 2026).

---

## 1. Convenciones de Commits (Conventional Commits)

Utilizamos el estándar de **Conventional Commits** adaptado a la arquitectura de monorepo. Cada commit debe indicar claramente el tipo de cambio y el `scope` del paquete o aplicación afectada:

### 1.1 Estructura del Mensaje
```text
<tipo>(<scope>): <descripción concisa en modo imperativo>

[cuerpo opcional detallando el motivo o justificación técnica]

[pie opcional con referencias a issues, ej: Closes #14]
```

### 1.2 Scopes Permitidos
- `back`: Cambios en la API NestJS, Prisma, módulos o base de datos (`apps/back`).
- `front`: Cambios en la interfaz Next.js, componentes o estilos Tailwind (`apps/front`).
- `shared`: Modificaciones en DTOs, Enums o tipos de datos compartidos (`packages/shared`).
- `devops`: Cambios en Dockerfile, docker-compose, CI/CD o variables de entorno.
- `docs`: Documentación técnica, manuales o diagramas.

### 1.3 Tipos de Commits
- `feat`: Nueva característica técnica (ej: `feat(back): implement sha256 revision hash on report update`).
- `fix`: Corrección de errores (ej: `fix(front): adjust print watermark opacity for A4 layout`).
- `refactor`: Refactorización de código sin alterar su comportamiento externo.
- `chore`: Mantenimiento de dependencias o configuración del workspace.
- `perf`: Optimización de rendimiento (ej: `perf(front): optimize telemetry canvas rendering`).
- `test`: Incorporación o mejora de pruebas unitarias o de integración.

---

## 2. Política de Branching & Flujo de Trabajo (Git Flow)

1. **Ramas Principales:**
   - `main`: Código calificado para producción y despliegue oficial. Solo admite Pull Requests aprobados.
   - `develop`: Rama de integración donde convergen las características del sprint técnico.

2. **Ramas de Trabajo:**
   - Formato: `<usuario>/<tipo>-<alcance>-<nombre-breve>`
   - Ejemplos:
     - `bdhipolito/feat-back-jwt-httponly-guard`
     - `mfogliato/feat-front-cansat-telemetry-specs`
     - `jviani/fix-front-calendar-tag-filtering`

---

## 3. Checklist de Revisión de Pull Requests (DoD)

Antes de solicitar la revisión y aprobación de un PR, cada integrante debe verificar los siguientes puntos:

- [ ] **Type Safety:** El paquete `@orbit/shared` compila sin errores (`npm run build:shared`).
- [ ] **Compilación Limpia:** No existen errores de tipado en TypeScript (`apps/back` ni `apps/front`).
- [ ] **Estilo de Diseño:** Los componentes de frontend respetan la paleta "Orbit / Apple Aesthetic" (`#0B1633`, `#17264F`, `#FF7A1A`) y las directrices de Apple HIG.
- [ ] **Seguridad de Acceso:** Los endpoints privados de Orbit están protegidos por `OrbitAuthGuard` y consumen la cookie `orbit_access_token`.
- [ ] **Sello SHA-256:** Los reportes y bitácoras modificados recalculan e imprimen su hash de integridad.
- [ ] **CSS Print:** Las vistas de informes mantienen el membrete oficial, la marca de agua centrada y la sección de firmas visible en modo impresión.
- [ ] **Documentación:** Todo nuevo endpoint está documentado con anotaciones de Swagger/OpenAPI.

---

## 4. Procedimiento de Backup y Restauración de Base de Datos PostgreSQL

Para resguardar los datos de ensayos de hardware, telemetría y bitácoras críticas de la misión CONAE, se deben seguir los siguientes procedimientos mediante `pg_dump` y `pg_restore`.

### 4.1 Generación de Copia de Seguridad (Backup)

#### Desde la máquina anfitriona (con Docker Compose):
```bash
# Crear directorio de respaldos si no existe
mkdir -p ./backups

# Generar dump en formato binario comprimido con timestamp
docker compose exec -t orbit-db pg_dump \
  -U orbit_user \
  -d orbit_db \
  -F c \
  -b -v \
  -f /tmp/orbit_backup_$(date +%Y%m%d_%H%M%S).dump

# Copiar el archivo generado desde el contenedor a la máquina local
docker cp orbit-db:/tmp/$(docker compose exec -t orbit-db ls -t /tmp | head -n 1 | tr -d '\r') ./backups/
```

#### Alternativa en SQL plano (Texto plano legible):
```bash
docker compose exec -T orbit-db pg_dump -U orbit_user -d orbit_db > ./backups/orbit_dump_latest.sql
```

### 4.2 Procedimiento de Restauración (Restore)

#### Restaurar desde un archivo binario (`.dump`):
```bash
# 1. Copiar el archivo de backup al contenedor
docker cp ./backups/orbit_backup_YYYYMMDD_HHMMSS.dump orbit-db:/tmp/restore_target.dump

# 2. Restaurar la base de datos limpiando objetos existentes
docker compose exec -t orbit-db pg_restore \
  -U orbit_user \
  -d orbit_db \
  -c -v \
  /tmp/restore_target.dump
```

#### Restaurar desde un archivo SQL plano (`.sql`):
```bash
docker compose exec -T orbit-db psql -U orbit_user -d orbit_db < ./backups/orbit_dump_latest.sql
```

---

## 5. Contacto del Equipo Técnico

- **Universidad Austral — Facultad de Ingeniería**
- **Sede:** Campus Universitario Pilar, Mariano Acosta 1611, B1629 Pilar, Provincia de Buenos Aires.
- **Canal Oficial:** `ausat@austral.edu.ar`
