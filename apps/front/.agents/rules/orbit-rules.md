# Reglas de Desarrollo de Orbit (AuSat)

Ver `CLAUDE.md` en `apps/front/` para el detalle.

1. **Identidad**: Proyecto Orbit, equipo AuSat (Universidad Austral).
2. **Modularidad**: Componentes base de Orbit en `components/orbit/ui/`; pantallas en `app/(orbit)/orbit/`.
3. **Estilos**: Tailwind CSS v4 con los tokens semánticos de `app/globals.css` (`bg-panel`, `text-fg`, `border-line`, `bg-brand`…). Sin hex sueltos en Orbit.
4. **Datos**: Tipos/enums desde `@orbit/shared`; etiquetas legibles en `lib/orbit/labels.ts`.
5. **Iconos**: Importar directamente de `lucide-react`.
