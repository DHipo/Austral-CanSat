# Orbit (AuSat) - Frontend Guidelines

Las convenciones completas (stack, estructura, tokens de estilo y reglas de dominio) están en [`CLAUDE.md`](./CLAUDE.md). Este archivo existe para agentes que leen `AGENTS.md`.

## Resumen
- Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS v4.
- Suite Orbit en `app/(orbit)/orbit/`, componentes base en `components/orbit/ui/`, datos y helpers en `lib/orbit/`.
- Estilos de Orbit solo con tokens semánticos (`bg-panel`, `text-fg`, `border-line`, `bg-brand`…) para soportar tema claro y oscuro.
- Tipos y enums compartidos con el backend desde `@orbit/shared`.
