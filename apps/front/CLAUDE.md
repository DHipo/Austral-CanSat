# AuSat - Orbit Frontend Directives

Frontend de **AuSat** (Universidad Austral) para el CanSat CONAE 2026: landing pública + **Orbit**, la suite interna del equipo.

## Stack
- Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, `lucide-react`.
- Tipos y enums compartidos con el backend desde `@orbit/shared` (`apps/packages/shared`).

## Estructura
- `app/(public)/` — landing institucional. Usa `components/public/*` y el `ThemeContext` (`isLight`).
- `app/(orbit)/orbit/` — suite Orbit (inicio, calendario, informes). Layout en `components/orbit/shell/OrbitShell.tsx`.
- `components/orbit/ui/` — componentes base de Orbit (`Button`, `Card`, `Badge`, `Field`, `Modal`, `PageHeader`, `EmptyState`, `Notice`, `Avatar`…). Reutilizarlos antes de crear estilos nuevos.
- `lib/orbit/` — equipo (`team.ts`), etiquetas de enums (`labels.ts`), formato de fechas (`format.ts`) y datos de ejemplo (`mock.ts`, a reemplazar por la API).

## Estilo de Orbit
- Usar los tokens semánticos definidos en `app/globals.css` (`bg-canvas`, `bg-panel`, `bg-panel-2`, `text-fg`, `text-fg-muted`, `text-fg-subtle`, `border-line`, `bg-brand`, `text-ok/warn/err/info/plum`). Funcionan en tema claro y oscuro.
- No usar colores hex sueltos dentro de Orbit (excepción: la hoja de impresión de `ReportPrintView`, que siempre es papel blanco).
- Marca: naranja AuSat como acento, tipografía Poppins, estética sobria tipo herramienta.

## Dominio
- Misión: paracaídas en apogeo, paraglider guiado, liberación de un huevo a 2 m, baliza al aterrizar.
- Reglamento: 1000 g ± 10 g, Ø136 × 250 mm, ≥ 2 h de operación, **sin LiPo**, telemetría ASCII a 1 Hz (XBee), ensayos drop/térmico/vibración/vacío.
- No mostrar datos técnicos inventados como si fueran reales; si son de ejemplo, indicarlo con `Notice`.
