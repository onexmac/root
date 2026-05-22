import type { Preview } from '@storybook/react-vite'
import '../react/design-system.css'
import '../react/QuantitySelector/QuantitySelector.css'
import '../react/SearchBar/SearchBar.css'
import '../react/SelectionDropdown/SelectionDropdown.css'
import '../react/SlideButton/SlideButton.css'
import '../react/ToggleCards/ToggleCards.css'
import '../react/screens/Slab/Slab.css'
import '../react/screens/Boletas/Boletas.css'
import '../react/screens/BoletaPedido/BoletaPedido.css'
import '../react/screens/Test1/Test1.css'
import '../react/screens/Test1/Test1Detail.css'
import '../react/screens/Test1v2/Test1v2.css'
import { adelanteTheme } from './theme'

const preview: Preview = {
  parameters: {
    docs: {
      theme: adelanteTheme,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date:  /Date$/i,
      },
    },
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark",    value: "#111111" },
        { name: "surface", value: "#f3f3f3" },
        { name: "white",   value: "#ffffff" },
      ],
    },
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
      },
    },
    a11y: { test: "todo" },
  },
};

export default preview;
