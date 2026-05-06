import type { Preview } from '@storybook/react-vite'
import '../react/design-system.css'
import '../react/screens/Slab/Slab.css'
import '../react/screens/Boletas/Boletas.css'
import { adelanteTheme } from './theme'

const preview: Preview = {
  parameters: {
    // ── Tema global (docs, fondo de controles) ──────────────────────────────
    docs: {
      theme: adelanteTheme,
    },

    // ── Controles ───────────────────────────────────────────────────────────
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date:  /Date$/i,
      },
    },

    // ── Backgrounds por defecto ─────────────────────────────────────────────
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark",    value: "#111111" },
        { name: "surface", value: "#f3f3f3" },
        { name: "white",   value: "#ffffff" },
      ],
    },

    // ── Viewports predefinidos ──────────────────────────────────────────────
    viewport: {
      viewports: {
        iphone16: {
          name: "iPhone 16",
          styles: { width: "393px", height: "852px" },
          type: "mobile",
        },
        ipad: {
          name: "iPad Air",
          styles: { width: "820px", height: "1180px" },
          type: "tablet",
        },
        desktop: {
          name: "Desktop 1366",
          styles: { width: "1366px", height: "768px" },
          type: "desktop",
        },
        desktopWide: {
          name: "Desktop 1920",
          styles: { width: "1920px", height: "1080px" },
          type: "desktop",
        },
      },
    },

    // ── A11y ────────────────────────────────────────────────────────────────
    a11y: {
      test: "todo",
    },
  },
};

export default preview;
