import type { Meta, StoryObj } from "@storybook/react-vite";
import { SelectionDropdown } from "./SelectionDropdown";

const meta: Meta<typeof SelectionDropdown> = {
  title: "Sistema de Diseño/SelectionDropdown",
  component: SelectionDropdown,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div style={{ width: 360, paddingTop: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SelectionDropdown>;

const SAMPLE_CATALOG = [
  { code: "CON-110-220", name: "CONECTOR ADAPTADOR HEMBRA EAGLE 110V SALIDA MACHO EAGLE 220V" },
  { code: "LAD-COMUN", name: "LADRILLO COMÚN" },
  { code: "LAD-PERFO", name: "LADRILLO PERFORADO" },
  { code: "CEM-50KG", name: "CEMENTO PORTLAND 50KG" },
  { code: "VAR-12MM", name: "VARILLA DE HIERRO 12MM" },
];

export const Default: Story = {
  args: {
    items: SAMPLE_CATALOG,
    onSelect: (item) => console.log("selected", item),
  },
};

export const CustomLabel: Story = {
  args: {
    items: SAMPLE_CATALOG,
    triggerLabel: "Agregar material",
    searchPlaceholder: "Buscar material…",
    onSelect: (item) => console.log("selected", item),
  },
};
