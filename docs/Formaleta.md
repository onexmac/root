# Formaleta.md — Prototype Screens

> Figma → MCP → Layout (pantallas de la app, prototipado rápido)

**Figma file:** `oRDLRL9OUNcTQ0k6G5MBPS` _(agregar key del archivo de prototipos cuando esté disponible)_
**Screens dir:** `react/screens/<NombrePantalla>/`

---

## Flujo — Generar una pantalla desde Figma

Cuando el usuario comparta una URL o nodo de pantalla de Figma:

### 1. Leer la pantalla
```
tool: get_figma_data
fileKey: <fileKey de la pantalla>
nodeId: el que aparezca en la URL (?node-id=XXX-XXX)
```

### 2. Mapear cada elemento visual a un componente de Live Code

| Elemento en Figma | Componente |
|---|---|
| Botón / `setButtons` | `Button` from `../Button/Button` |
| Barra de búsqueda / `searchField` | `SearchBar` from `../SearchBar/SearchBar` |
| Tabs / navegación | `TabsMenu` from `../TabsMenu/TabsMenu` |
| Toggle colapsable | `ToggleCards` from `../ToggleCards/ToggleCards` |
| Nav bar | `Nav` from `../Nav/Nav` |
| Tarjeta de resumen | `SummaryCard` from `../Card/Card` |
| Lista de materiales | `MaterialList` from `../Card/Card` |
| Tarjeta de detalle | `DetailCard` from `../Card/Card` |
| Campo de formulario | `FormField` from `../Form/Form` |
| Checkbox | `CheckBox` from `../Form/Form` |
| Tag | `Tag` from `../Form/Form` |
| OptionLabel | `OptionLabel` from `../Form/Form` |
| Ícono | `Icon` from `../Icon/Icon` |

### 3. Verificar existencia en Live Code

**Si un componente o valor visual NO existe en Live Code → preguntar al usuario:**
> "El elemento `[nombre]` del prototipo no tiene un componente equivalente en el sistema. ¿Qué hacemos?
> 1. **Crear** — lo implemento como componente nuevo (quedará en el sistema de diseño)
> 2. **Usar uno existente** — dime cuál y lo adapto para esta pantalla
> 3. **Modificar uno existente solo para este prototipo** — lo extiendo localmente sin tocar el original"

Esperar respuesta antes de continuar.

### 4. Crear la pantalla
- Archivo: `react/screens/<NombrePantalla>/<NombrePantalla>.tsx`
- Reutilizar componentes existentes — no reinventar
- Layout con CSS (flexbox/grid) usando tokens `var(--ds-*)`
- Animaciones con `motion/react` cuando aplique:
  ```tsx
  import { motion } from "motion/react";
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: "spring", stiffness: 300, damping: 28 }}
  />
  ```

### 5. Agregar story
- Archivo: `react/screens/<NombrePantalla>/<NombrePantalla>.stories.tsx`
- Title: `"Screens/<NombrePantalla>"`
- Mínimo una story `Default` con la pantalla completa en layout `fullscreen`

### 6. Commit y push
```bash
git add react/screens/<NombrePantalla>/
git commit -m "feat(screens): add <NombrePantalla> screen"
git push origin main
```

---

## Pantallas existentes

| Pantalla | Archivo | Descripción |
|---|---|---|
| BoletaPedido | `react/screens/BoletaPedido/` | Detalle de boleta de pedido |
| Boletas | `react/screens/Boletas/` | Listado de boletas |
| Slab | `react/screens/Slab/` | Vista de losa flotante |

---

## Reglas
1. Nunca hardcodear colores — siempre `var(--ds-color-*)`.
2. Nunca usar Tailwind.
3. Reutilizar componentes del sistema — no duplicar lógica.
4. Si algo falta en el sistema, preguntar al usuario antes de improvisar.
