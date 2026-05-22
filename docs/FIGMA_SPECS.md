# Figma Specs — Losa Flotante Design System
> Extraído de la API de Figma · Archivo: `oRDLRL9OUNcTQ0k6G5MBPS` · Fecha: 2026-05-19
> 151 componentes · 5 familias: buttons, cards, forms, iconos, nav

---

## 1. BUTTONS — 53 variantes

### Primary Button
| Propiedad | Valor |
|---|---|
| Tamaño externo | 80×80px |
| Padding externo | 12px todos lados |
| Tamaño Body | 56×56px |
| Padding Body | 16px todos lados |
| Border-radius | 16px (`--ds-radius-lg`) |
| Gap interno | 8px |
| **green** fill | `rgba(173,208,16)` — `#ADD010` |
| **red** fill | (pendiente de extracción) |
| **gray / disabled** fill | `rgba(217,217,217)` — `#D9D9D9` |
| **secondary black** fill | `rgba(0,0,0)` |
| **secondary white** fill | `rgba(255,255,255)` |
| Label font | 16px w600 roboto |
| Label color (green) | `rgba(0,0,0)` — negro |
| Label color (secondary black) | `rgba(255,255,255)` — blanco |
| **Pressed** | stroke 8px sólido negro sobre el Body |

### Layouts de Button
| Layout | Variante |
|---|---|
| `label` | solo texto |
| `icon` | solo ícono 24×24 |
| `icon-left` | ícono izq + label |
| `icon-right` | label + ícono der |

### Buttons de estado material (pendiente/completo/incompleto/sin stock)
Misma estructura. Fondo según estado. Íconos: `pendiente`, `completado`, `incompleto`, `sin stcok`.

---

## 2. CARDS — 4 variantes

### SummaryCard (`visibility=open` / `visibility=close`) — node `1027:3997`
| Propiedad | Valor |
|---|---|
| Tamaño (open) | 362×116px |
| Tamaño (close) | 362×112px |
| Padding | T=2 R=12 B=2 L=20 |
| Border-radius | 16px |
| Fill | `rgba(255,255,255)` blanco |
| Gap | 118px (justify apart) |

**Columna izquierda:**
| Elemento | Tamaño | Font | Color |
|---|---|---|---|
| Proyecto (ej. "NOVARUM") | 80×24 | 16px w600 | `rgba(93,99,108)` #5D636C |
| Código (ej. "C.01") | 80×24 | 24px w600 | `rgba(93,99,108)` |
| Boleta (ej. "BS000095") | 116×24 | 16px w600 | `rgba(0,0,0)` |
| Timestamp (ej. "Ayer 10:25 am") | — | 12px w400 | `rgba(93,99,108)` |
| Ícono Info | 20×20 | — | negro |

**Columna derecha:**
- Ícono de estado (32×32)
- Botón toggle (60×88 open / 60×50 close): padding 12px, radius 16px, fill negro, ícono `open`/`close` blanco 24×24

---

### materialList — node `677:2515`
| Propiedad | Valor |
|---|---|
| Tamaño | 353×88px |
| Padding | T=8 R=20 B=8 L=20 |
| Border-radius | 16px |
| Fill | blanco |
| Gap | 20px |
| Descripción font | 16px w400, negro, 2 líneas |

**quantitySelector:**
- 49×49px
- Círculo negro 37×37, stroke 4px negro
- Número centrado: 16px w600, blanco
- Anillo exterior: stroke 6px amarillo `rgba(240,200,2)`, fondo gris `rgba(217,217,217)` w=8

---

### detailCard — node `1213:4316`
| Propiedad | Valor |
|---|---|
| Tamaño | 353×440px |
| Padding | T=12 B=12 |
| Radius | 16px |
| Fill | blanco |
| Gap | 12px |
| Contenido | 1× summaryCard + 3× materialList |

---

## 3. FORMS — 20 variantes

### FormField
| State | Tamaño | Label | Input border | Input fill |
|---|---|---|---|---|
| `standard` | 370×83 | 14px w400 negro | ninguno | blanco |
| `active` | 370×87 | 16px w400 negro | 2px negro | blanco |
| `x` | 370×88 | 16px w400 negro | 2px verde `#ADD010` | blanco |
| `ayuda` | 370×109 | 16px w400 negro | ninguno | blanco |
| `advertencia` | 370×109 | 16px w400 negro | 2px rojo `rgba(201,108,108)` | blanco |
| `disabled` | 370×87 | 16px w400 gris | ninguno | `rgba(235,235,235)` |

**Input field (todos):**
- Padding: T=16 R=20 B=16 L=20
- Radius: 32px
- Placeholder: 16px w400 `rgba(170,175,182)` #AAAFB6

**Helper text (ayuda):**
- 12px w400 `rgba(170,175,182)` gris

**Helper text (advertencia):**
- Ícono `incompleto` 20×20 rojo `rgba(201,108,108)`
- Texto: 12px w400 `rgba(187,74,74)` rojo oscuro

---

### CheckBox — 4 estados
| State | Box fill | Box stroke | Ícono |
|---|---|---|---|
| `standard` | blanco | 4px negro | — |
| `add` | blanco | **8px negro** | `completado` 24×24 negro |
| `remove` | blanco | **8px negro** | `remove` 24×24 negro |
| `disabled` | `rgba(235,235,235)` gris | 4px gris `rgba(217,217,217)` | — |

**Todos:**
- Box: 30×30, radius 16px
- Tamaño total: 263×30
- Gap: 8px
- Label: 16px w400 negro (disabled: negro también)

---

### ProgressBar — 5 estados (0%, 25%, 50%, 75%, 100%)
| Propiedad | Valor |
|---|---|
| Tamaño total | 368×66 |
| Gap | 4px |
| Label font | 16px w400 negro |
| Track alto | 14px, radius 20px |
| Track fondo | blanco (vacío) |
| Track fill | negro (progreso) |
| Descripción | 12px w400 `rgba(170,175,182)` gris |
| Track: 0% | dot negro 14×14 a la izquierda |
| Track: 25% | barra negra 76px |
| Track: 100% | barra completa negra |

---

### Tag — node `1123:24555`
| State | Fill | Stroke | Text | Ícono |
|---|---|---|---|---|
| `standard` | transparente | 2px `rgba(217,217,217)` gris | 16px w600 `rgba(170,175,182)` | — |
| `active` | `rgba(0,0,0)` negro | — | 16px **w400** blanco | `completado` 20×20 blanco |
| `disabled` | `rgba(217,217,217)` gris | — | 16px w400 `rgba(170,175,182)` | — |

**Todos:**
- Padding: T12 R16 B12 L16
- Radius: 32px (active/disabled) / 40px (standard)
- Altura: 48px

---

### OptionLabel — 3 estados
| State | Círculo fill | Círculo stroke | Text |
|---|---|---|---|
| `standard` | blanco | 4px gris `rgba(217,217,217)` | 16px w400 negro |
| `active` | **negro** | 4px negro | 16px w400 negro |
| `disabled` | `rgba(235,235,235)` | 4px gris | 16px w400 gris |

**Todos:**
- Padding: T8 R12 B8 L12
- Gap: 8px
- Círculo: 30×30
- Tamaño total: 268×46

---

## 4. ICONOS — 33 íconos

| Nombre Figma | Node ID | Nombre código |
|---|---|---|
| completado | 639:2157 | `check` |
| Info | 639:2165 | `info` |
| traslado (fill) | 622:2459 | `traslado` |
| traslado (outline) | 622:2457 | — |
| place | 747:2591 | `place` |
| List | 639:2181 | `list` |
| leans | 617:2166 | `search` |
| go | 639:2137 | `go` |
| sin autorizar | 716:2400 | `unauthorized` |
| home | 639:2191 | `home` |
| User | 639:2171 | `user` |
| filter | 639:2168 | `filter` |
| menu | 1426:350 | `menu` |
| options | 1426:344 | `options` |
| back | 639:2287 | `back` |
| edit | 639:2162 | `edit` |
| Warning | 758:2678 | `warning` |
| open | 617:1923 | `open` |
| close | 617:1948 | `close` |
| arrow | 626:2802 | `arrow-right` |
| pendiente | 639:2159 | `pending` |
| Minus | 639:2124 | `minus` |
| add | 639:2121 | `add` |
| delete | 639:2127 | `delete` |
| sin stock | 639:2156 | `no-stock` |
| incompleto | 639:2158 | `incomplete` |
| Calculator | 1102:2842 | `calculator` |
| remove | 1029:4229 | `remove` |
| Folder | 639:2188 | `folder` |
| boleta | 622:2458 | `boleta` |
| good | 639:2176 | `good` |
| cuadrillas | 1342:354 | `cuadrillas` |
| rol | 1342:361 | `rol` |

**Todos los íconos:** 24×24px, SVG vector.

---

## 5. NAV — 41 variantes

### TabsMenu — label layout
| Propiedad | Valor |
|---|---|
| Tamaño externo | 300×100px (label) / 300×104px (label+icon) |
| Padding externo | 12px todos lados |
| Pill ("tabs") tamaño | 276×76px |
| Pill padding | T=24 R=40 B=24 L=40 |
| Pill gap | 8px |
| Pill radius | 32px |
| Pill fill | `rgba(0,0,0)` negro |
| Label font | 16px w600 blanco |
| **Pressed** state | stroke 8px negro sólido sobre el pill |
| **Disabled** state | misma estructura, pendiente de color |

---

### SearchBar (nombrado `layout=icon` en nav) — node `1014:3599`
| Propiedad | Valor |
|---|---|
| Tamaño externo | 92×83px |
| Padding | 12px |
| Campo tamaño | 65×59 (estático) / expandido cuando activo |
| Campo padding | T=20 R=20 B=20 L=20 |
| Campo radius | 32px |
| Campo fill | blanco |
| Placeholder | "Buscar" 14px w400 `rgba(170,175,182)` |
| Ícono search | 24×24 negro |
| **Pressed** state | stroke 8px `rgba(243,243,243)` sobre el campo |

---

### FilterBar — node `1375:350`
| Propiedad | Valor |
|---|---|
| Tamaño total | 439×76px |
| Padding | 16px todos lados |
| Gap entre chips | 8px |
| Radius | 48px |
| Fill | blanco |

**Chip activo:**
| Propiedad | Valor |
|---|---|
| Tamaño | ~130×44px |
| Padding | T=12 R=16 B=12 L=16 |
| Gap | 4px |
| Radius | 32px |
| Fill | `rgba(0,0,0)` negro |
| Label font | 16px **w400 regular** blanco |
| Ícono | 20×20 blanco (der del label) |

**Chip deshabilitado:**
| Propiedad | Valor |
|---|---|
| Fill | `rgba(217,217,217)` gris |
| Label color | `rgba(170,175,182)` |
| Ícono color | `rgba(170,175,182)` |

---

### FilterOptions — node `1023:3602`
| State | Tamaño | Padding | Radius | Fill | Stroke |
|---|---|---|---|---|---|
| `standard` | 65×59 | 12px | 32px | blanco | — |
| `pressed` | 65×59 | 12px | 32px | blanco | 8px `rgba(243,243,243)` ≈ blanco/gris |
| `close` pressed | — | — | — | — | 8px negro 80% |

Ícono `filter` 24×24 negro.

---

### NavigationControls — node `1023:3648`
| Propiedad | Valor |
|---|---|
| Tamaño | 65×59 |
| Padding | 12px |
| Radius | 32px |
| Fill | blanco |
| Ícono `back` | 24×24 negro |

Mismo spec para `state=standard, navigation=go` (ícono `go`).

---

### SelectionDropdown (selectionDropdown)
| State | Tamaño | Padding | Radius | Fill |
|---|---|---|---|---|
| `compressed` | 372×80 | T16 R12 B16 L20 | 32px | blanco |
| `expanded` | 372×366 | — | — | blanco |

**Compressed:**
- Label placeholder: 16px w400 `rgba(170,175,182)` gris
- Botón toggle: 60×50, padding 12px, radius 16px, fill negro, ícono `open` blanco

**Expanded:**
- 4× TabsMenu stacked con gap negativo –12px
- Mismo botón toggle pero ícono `close`

---

### SlideButton — node `997:3097`
| State | Valor |
|---|---|
| **Standard** tamaño | 242×80px |
| Fill externo | blanco |
| Track (labels) tamaño | 236×54 |
| Track radius | 16px |
| Track fill | negro |
| Track label | 16px w600 blanco |
| Knob externo | 80×80 |
| Knob padding | 12px |
| Knob Body | 56×56 |
| Knob Body padding | 16px |
| Knob Body radius | 16px |
| Knob Body fill | `rgba(173,208,16)` verde |
| Ícono `arrow-right` | 24×24 |
| **Pressed** Knob Body | stroke 8px `rgba(136,160,36)` verde oscuro |
| **Pressed** Knob tamaño Body | 64×64 (+8px por halo) |

---

## Discrepancias encontradas vs código actual

| Componente | Propiedad | Figma | Código actual | Fix needed |
|---|---|---|---|---|
| FilterBar chip | `font-weight` | w400 regular | `var(--ds-font-weight-semibold)` = w600 | Cambiar a `w400` |
| FilterBar chip | height | 44px | 48px | Cambiar a 44px |
| FilterBar chip | icon order | label → icon | ya corregido (commit e2be5a2) | ✓ |
| Tag `active` | font-weight | w400 | desconocido | Verificar |
| Tag `active` | incluye ícono `completado` | sí (20×20) | no | Agregar ícono |
| FilterOptions pressed | stroke color | `rgba(243,243,243)` (gris claro) | `var(--ds-color-surface)` | Verificar si surface = #F3F3F3 |
| FormField `standard` | label font-size | 14px | 16px | Revisar |
