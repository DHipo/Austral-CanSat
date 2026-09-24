# Orbit (AuSat) - Frontend Guidelines and Architecture

Documentación de arquitectura y convenciones para el desarrollo del frontend de **Orbit**, proyecto aeroespacial de **AuSat** (Universidad Austral) para la competencia CanSat 2026.

## 1. Misión del Proyecto Orbit
Orbit es la plataforma interactiva y panel de control para el satélite de tipo CanSat de AuSat. La misión comprende:
- Monitoreo de telemetría en tiempo real (altitud, velocidad, aceleración 3-ejes, presión, temperatura, GPS).
- Seguimiento de las etapas de vuelo: Lanzamiento, Apogeo / Eyección, Descenso en Paracaídas, Despliegue de Paraglider Guiado, Entrega Suave de Carga (Huevo a 2m del suelo).
- Divulgación técnica, presentación del equipo de la Universidad Austral y patrocinadores.

## 2. Stack Tecnológico
- **Framework**: React 19 + TypeScript + Vite
- **Estilos**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Iconografía**: `lucide-react`
- **Animaciones**: `motion` (`motion/react`)
- **Utilidades de UI**: `clsx`, `tailwind-merge`

## 3. Principios de Diseño
- **Estética Aeroespacial**: Interfaces oscuras de alta legibilidad inspiradas en centros de control de misiones (NASA/ESA/SpaceX), con tarjetas translúcidas (glassmorphism), bordes sutiles y acentos de color cian, ámbar y esmeralda.
- **Rendimiento y Escalabilidad**: Código tipado, componentes reutilizables en `src/components/`, hooks desacoplados en `src/hooks/`.
