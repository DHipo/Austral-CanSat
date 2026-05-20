# Investigation Summary: [Competition 2025]

- **Author:** [DHipo]
- **Date:** 2026-05-20
- **Category:** Report/Summary of last competition

## 1. Objective
Tener un vistazo sobre que se nos va a pedir al hacer este proyecto, ver los entregables que se piden, las fases que existen las etapas que existen y las pruebas que se deben hacer para pasar. Estimar tiempos entre cada fase y imaginar tareas asociadas a estas.

## 2. Directory Structure
Briefly describe what is in this folder:
- \data/\: **Report CanSat 2025**, archivo dado por Fernando Litchstein sobre la competencia el año pasado.
- \images/\: none
- \specs/\: none

## 3. Findings / Research

### 3.1 Concepto de Operaciones (CONOP)
La misión se divide en fases críticas:
*   **Ascenso:** El CanSat funciona como el morro (nose cone) del cohete. Telemetría a 1 Hz.
*   **Separación:** A apogeo, el contenedor se separa y despliega su paracaídas (descenso ≤ 15 m/s).
*   **Liberación de Payload:** Al 80% del apogeo, el payload se libera del contenedor y despliega un paraglider (descenso promedio 5 m/s).
*   **Descenso Controlado:** El payload navega hacia un punto objetivo usando el paraglider.
*   **Liberación del Instrumento:** A 2 metros del suelo, se debe liberar un huevo de gallina real (54-64g) sin que se rompa.
*   **Aterrizaje:** Activación de baliza audible para recuperación.

### 3.2 Requisitos Técnicos Críticos
*   **Masa:** 1000g ± 10g (CanSat + contenedor).
*   **Dimensiones:** Diámetro del hombro 136 mm, altura total 250 mm.
*   **Energía:** Operación mínima de 2 horas. Prohibidas las baterías LiPo. Se recomiendan celdas 18650 en empaque metálico.
*   **Sensores:** Altitud (barométrica), temperatura, voltaje, GPS, IMU de 6-DOF y dos cámaras color (mín. 640x480).
*   **Comunicaciones:** Radios XBee (2.4 GHz o 900 MHz) con paquetes ASCII a 1 Hz.

### 3.3 Pruebas Ambientales Obligatorias
Se deben realizar y documentar con video 4 pruebas:
1.  **Drop Test:** ~30G para verificar resistencia de anclajes y montaje.
2.  **Prueba Térmica:** 60°C por 2 horas.
3.  **Prueba de Vibración:** 0-233 Hz (usando lijadora orbital aleatoria).
4.  **Prueba de Vacío:** Verificar despliegue de mecanismos por cambio de presión.

## 4. Conclusions
La competencia de 2026 (según el reporte de 2025) tiene un enfoque fuerte en el **control de navegación (paraglider)** y la **entrega delicada de carga (huevo)**. Los márgenes de masa son muy estrictos (±10g), lo que requiere un control riguroso del peso desde el diseño inicial. El éxito depende críticamente de pasar las **pruebas ambientales** y de tener un software robusto que recupere el estado tras reinicios (usando EEPROM).

## 5. Next Steps

> Analizar satelites de años pasados y buscar en que podemos destacar.

Como todavia no sabemos cuando se abren las inscripciones seguimos alerta a la pagina principal del cansat, siendo las siguientes:

- [Pagina del gobierno](https://www.argentina.gob.ar/ciencia/conae/cansat-argentina/cansat-universitario)
- [CanSat Argentina](https://cansatargentina.com.ar/)

Mas alla de eso, podemos empezar la fase de investigacion sobre los sistemas principales que tendria el satelite. Buscar los proyectos de años pasados, analizar sus sistemas creados, verificar su funcionamiento y ver posibles mejoras.

> Entre mas adelantemos ahora, mejor satelite vamos a tener.