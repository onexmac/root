# LosaFlotante.md — Design System Live Code

> Figma → MCP → Live Code (componentes del sistema de diseño)

**Figma file:** `oRDLRL9OUNcTQ0k6G5MBPS`
**Storybook live:** https://davidpcad.github.io/adelante-design-system/
**GitHub:** https://github.com/DavidpcAD/adelante-design-system

---

## Flujo — Actualizar o crear un componente

Cuando el usuario comparta un nodo de Losa Flotante o diga *"actualiza/crea el [Componente] según Figma"*:

### 1. Leer el nodo en Figma
```
tool: get_figma_data
fileKey: oRDLRL9OUNcTQ0k6G5MBPS
nodeId: el que aparezca en la URL (?node-id=XXX-XXX)
```

### 2. Identificar qué existe en Live Code
Revisar si el componente ya existe en `react/<Componente>/<Componente>.tsx`.

**Si el valor o componente NO existe en Live Code → preguntar al usuario:**
> "El componente/valor `[nombre]` no existe en el sistema. ¿Qué hacemos?
> 1. **Crear** — lo implemento nuevo siguiendo los tokens de Figma
> 2. **Usar uno existente** — dime cuál y lo mapeo
> 3. **Modificar uno existente** — dime cuál y le agrego lo que falta"

Esperar respuesta antes de continuar.

### 3. Implementar el cambio
- Archivo: `react/<Componente>/<Componente>.tsx`
- Usar **solo** tokens de `react/design-system.css` — nunca valores hardcodeados
- Seguir las props y variantes exactas que muestra Figma

### 4. Actualizar la story
- Archivo: `react/<Componente>/<Componente>.stories.tsx`
- Agregar una story por cada variante nueva o modificada
- Mantener las stories existentes intactas

### 5. Commit y push
```bash
git add react/<Componente>/
git commit -m "feat(<Componente>): [descripción del cambio según Figma]"
git push origin main
```
El Storybook se despliega automáticamente en GitHub Pages.

---

## Componentes existentes en Live Code

| Componente | Archivo | Variantes / Props clave |
|---|---|---|
| Button | `react/Button/Button.tsx` | color: green\|red\|white\|black\|gray · layout: label\|icon-left\|icon-right\|icon · state: standard\|pressed\|disabled |
| SearchBar | `react/SearchBar/SearchBar.tsx` | layout: label\|icon · state: standard\|active\|disabled |
| TabsMenu | `react/TabsMenu/TabsMenu.tsx` | layout: label+icon\|label · state: standard\|pressed |
| FormField | `react/Form/Form.tsx` | state: standard\|active\|x\|ayuda\|advertencia\|disabled |
| CheckBox | `react/Form/Form.tsx` | state: add\|remove\|standard\|disabled |
| Tag | `react/Form/Form.tsx` | state: active\|standard |
| ProgressBar | `react/Form/Form.tsx` | progress: 0–100 |
| OptionLabel | `react/Form/Form.tsx` | state: active\|standard\|disabled |
| SummaryCard | `react/Card/Card.tsx` | visibility: open\|close |
| MaterialList | `react/Card/Card.tsx` | qtyState: pendiente\|completo\|incompleto\|sin-stock |
| DetailCard | `react/Card/Card.tsx` | compuesto de SummaryCard + MaterialList |
| Nav | `react/Nav/Nav.tsx` | NavigationControls · FilterOptions · ToggleMenu |
| Icon | `react/Icon/Icon.tsx` | name: search\|back\|forward\|close\|menu\|check\|alert\|plus\|minus\|edit\|delete\|home\|user\|settings\|arrow-up\|arrow-down |
| ToggleCards | `react/ToggleCards/ToggleCards.tsx` | state: standard · mode: normal · visibility: open\|close |
| ScrollPicker | `react/ScrollPicker/` | — |
| SelectionDropdown | `react/SelectionDropdown/` | — |
| SlideButton | `react/SlideButton/` | — |

---

## Tokens de diseño (`react/design-system.css`)

### Colores
```css
--ds-color-green-100: #add010   --ds-color-green-200: #88a024
--ds-color-red-100:   #c96c6c   --ds-color-red-200:   #bb4a4a
--ds-color-gray-500:  #5d636c   --ds-color-gray-400:  #747b86
--ds-color-gray-300:  #aaafb6   --ds-color-gray-200:  #d9d9d9
--ds-color-gray-100:  #ebebeb   --ds-color-black:     #000000
--ds-color-white:     #ffffff   --ds-color-surface:   #f3f3f3
--ds-color-yellow:    #f0c802
```

### Spacing
```css
--ds-space-1: 4px   --ds-space-2: 8px   --ds-space-3: 12px
--ds-space-4: 16px  --ds-space-5: 20px  --ds-space-6: 24px
```

### Border Radius
```css
--ds-radius-sm: 4px   --ds-radius-md: 8px
--ds-radius-lg: 16px  --ds-radius-xl: 32px
```

### Sombras
```css
--ds-shadow-01:      0 4px 8px rgba(170,175,182,.25)
--ds-shadow-02-soft: 0 6px 0 rgba(0,0,0,.16)
--ds-shadow-03-big:  0 2px 4px rgba(0,0,0,.16), 0 0 6px rgba(0,0,0,.16)
```

### Tipografía
```css
--ds-font-family:       "Roboto", "Segoe UI", sans-serif
--ds-font-size-body-sm: 12px   --ds-font-weight-regular:  400
--ds-font-size-body-md: 16px   --ds-font-weight-semibold: 600
--ds-font-size-subtitle: 20px
--ds-font-size-heading:  32px
```

---

## Reglas
1. Nunca hardcodear colores — siempre `var(--ds-color-*)`.
2. Nunca usar Tailwind — CSS custom properties únicamente.
3. Siempre agregar o actualizar la story del componente.
4. Commit y push para que el Storybook se actualice en vivo.
