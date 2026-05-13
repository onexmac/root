import type { ReactElement } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchBar } from "./SearchBar";

const meta: Meta<typeof SearchBar> = {
  title: "Sistema de Diseño/SearchBar",
  component: SearchBar,
  parameters: { layout: "centered" },
  argTypes: {
    layout: { control: { type: "inline-radio" }, options: ["icon", "normal", "label", "expanded"] },
    state: { control: { type: "inline-radio" }, options: ["standard", "pressed"] },
  },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

const wrap = (Story: () => ReactElement) => (
  <div style={{ width: 360 }}>
    <Story />
  </div>
);

/** layout=icon, state=standard */
export const IconStandard: Story = {
  args: { layout: "icon", state: "standard", onClick: () => console.log("tap") },
};

/** layout=icon, state=pressed (también se aplica auto al :active) */
export const IconPressed: Story = {
  args: { layout: "icon", state: "pressed", onClick: () => console.log("tap") },
};

/** layout=normal: pill vacío sin texto ni close */
export const Normal: Story = {
  args: { layout: "normal", state: "standard", placeholder: "Buscar" },
  decorators: [wrap],
};

/** layout=label: pill con valor + close X */
export const Label: Story = {
  args: {
    layout: "label",
    state: "standard",
    value: "LADRILLO",
    onChange: () => {},
    onClose: () => console.log("close"),
  },
  decorators: [wrap],
};

/** layout=expanded: pill + panel de sugerencias debajo, con highlight semibold del match */
export const Expanded: Story = {
  args: {
    layout: "expanded",
    state: "standard",
    value: "LADRILLO",
    onChange: () => {},
    onClose: () => console.log("close"),
    suggestions: [
      { id: "1", name: "LADRILLO" },
      { id: "2", name: "LADRILLO LABEL" },
      { id: "3", name: "LABEL LADRILLO" },
      { id: "4", name: "LABEL LADRILLO" },
    ],
    onPick: (s) => console.log("pick", s),
  },
  decorators: [wrap],
};
