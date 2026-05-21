import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Buttons",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    color:  { control: "select", options: ["green", "red", "white", "black", "gray"] },
    layout: { control: "select", options: ["label", "icon-left", "icon-right", "icon"] },
    state:  { control: "select", options: ["standard", "pressed", "disabled"] },
    icon:   { control: "select", options: ["home", "check", "plus", "back", "forward", "search", "filter"] },
  },
  args: { label: "Confirmar", color: "green", layout: "label", state: "standard" },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Green:  Story = { args: { color: "green",  label: "Confirmar" } };
export const Red:    Story = { args: { color: "red",    label: "Cancelar" } };
export const White:  Story = { args: { color: "white",  label: "Volver" } };
export const Black:  Story = { args: { color: "black",  label: "Continuar" } };
export const Gray:   Story = { args: { color: "gray",   label: "No disponible" } };

export const Pressed:  Story = { args: { color: "green", state: "pressed",  label: "Pressed" } };
export const Disabled: Story = { args: { state: "disabled", label: "Disabled" } };

export const IconLeft:  Story = { args: { layout: "icon-left",  icon: "back",    label: "Volver" } };
export const IconRight: Story = { args: { layout: "icon-right", icon: "arrow-right", label: "Siguiente" } };
export const IconOnly:  Story = { args: { layout: "icon",       icon: "plus" } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, max-content)", gap: 16, padding: 16 }}>
      {(["green","red","white","black","gray"] as const).map((c) => (
        <React.Fragment key={c}>
          <Button color={c} label={`${c} standard`} state="standard" />
          <Button color={c} label={`${c} pressed`}  state="pressed" />
        </React.Fragment>
      ))}
    </div>
  ),
};
