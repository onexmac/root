# Adelante Design System

Sistema de diseño centralizado para todas las aplicaciones internas de Adelante.

Este repositorio define los estándares visuales y componentes reutilizables que deben utilizarse en todos los desarrollos para mantener consistencia visual y mejorar la velocidad de desarrollo.

---
# Component Status

| Component | Design | Development | Status |
|----------|--------|-------------|--------|
| Button | Figma | React | 🟡 In Design |
| Input | Figma | React | 🟡 In Design |
| Card | Figma | React | 🟡 In Design |
| Search Bar | Figma | React | 🟡 In Design |
| Table | - | - | ⏳ Planned |
| Modal | - | - | ⏳ Planned |
| Dropdown | - | - | ⏳ Planned |
| Sidebar | - | - | ⏳ Planned |
| Navbar | - | - | ⏳ Planned |

# Figma Design Source

Archivo principal del sistema de diseño en Figma:

https://www.figma.com/design/oRDLRL9OUNcTQ0k6G5MBPS/Losa-Flotante

Aquí el equipo UX/UI define:

- Colores del sistema
- Tipografía
- Layouts
- Componentes UI
- Botones
- Inputs
- Cards
- Iconos

Los desarrolladores deben consultar este archivo antes de implementar componentes.

---

# Estructura del repositorio

adelante-design-system

figma  
Documentación y enlace al archivo principal de Figma donde se diseñan los componentes.

tokens  
Variables del sistema de diseño como colores, tipografía y espaciados.

components  
Documentación de los componentes UI del sistema.

react  
Implementación de componentes reutilizables en React.

assets  
Iconos, imágenes y recursos gráficos oficiales del sistema de diseño.

guidelines  
Reglas de uso del sistema de diseño y buenas prácticas UX/UI.

---

# Flujo de trabajo

1. El equipo UX/UI diseña componentes en Figma.
2. Los tokens de diseño se documentan en este repositorio.
3. Los desarrolladores crean componentes reutilizables en React.
4. Las aplicaciones consumen esos componentes para mantener consistencia.

---

# Objetivo del Design System

Este sistema de diseño busca:

- Mantener consistencia visual en todos los sistemas
- Reducir duplicación de componentes
- Mejorar la velocidad de desarrollo
- Facilitar el trabajo entre UX/UI y desarrolladores
- Mejorar la experiencia de usuario en todas las aplicaciones

---

# Uso por desarrolladores

Antes de crear un nuevo componente:

1. Revisar la carpeta **components**
2. Revisar los **tokens de diseño**
3. Consultar el archivo de **Figma**
4. Utilizar los **assets oficiales**
5. Seguir las **guidelines UX/UI**

---

# Tecnologías relacionadas

Este sistema de diseño está pensado para integrarse con:

- React
- Power Apps
- Business Central
- Aplicaciones web internas
