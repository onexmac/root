# KPI Adelante — prototipo

App móvil (web app instalable en iOS) de KPIs y alertas para la gerencia de Adelante.
En vivo: https://adelante-kpi.vercel.app

Es un prototipo con **datos de ejemplo**: todo está en un solo `index.html` (HTML + CSS + JS, sin build).

## Correr local

```bash
npx serve .        # o cualquier servidor estático
```

## Estructura

- `index.html` — toda la app. Dependencias por CDN: Google Fonts (Barlow / Barlow Condensed) y Phosphor Icons.
- `av/` — avatares de los chats de Alertas.
- `fotos/` — fotos de ejemplo de los despachos.
- `apple-touch-icon.png`, `icon-*.png`, `manifest.webmanifest` — ícono y modo app en iOS / Android.

## Pantallas

- **Inicio** — grilla de 8 espacios (hero, pequeños, ancho). Tocar = detalle del KPI; mantener presionado = elegir otro KPI (si ya está en pantalla, intercambia).
- **Alertas** — chats por bodega / área, con filtros. Cada mensaje es un despacho con su boleta: presupuesto, solicitado y despachado, recorrido (despachado → seguridad → chofer → líder de cuadrilla) y fotos.
- Flujo, Personal y Costos todavía no tienen vista.

## Datos y sistemas

- Cada KPI indica la app de donde sale: **A3** Tres Amigos, **B0** Boletas, **H4** Horas, **V5** Ventas, **BC** Business Central.
- En el JS: `KPIS` (KPIs del inicio), `CHATS` (chats), `POSTS` (despachos de ejemplo) e `ISSUES` (problemas de ejemplo por chat).
- Reglas de color en Alertas:
  - Barra: despachado vs. presupuesto — azul creciendo, `#ADD010` al 100 %, roja si algo se excede (más oscura según el exceso).
  - Puntos: etapa del pedido — azul lo que ya pasó, todo verde al completarse, rojo el check que se saltó.
  - Notificación roja: el chat tiene un exceso de presupuesto, un check saltado o una foto señalada por seguridad (borde rojo de 4 px, va primera).

## Movimiento

Resortes generados como CSS `linear()` (función `spring()`), transiciones de tile/tarjeta a pantalla completa, volver deslizando desde el borde izquierdo y rebote elástico en el scroll.
