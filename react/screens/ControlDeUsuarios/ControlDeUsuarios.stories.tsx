import type { Meta, StoryObj } from "@storybook/react-vite";
import { ControlDeUsuarios } from "./ControlDeUsuarios";

const meta: Meta<typeof ControlDeUsuarios> = {
  title: "H4/Control de usuarios",
  component: ControlDeUsuarios,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Prototipo interactivo H4 — 10 frames (U01–U05, R01–R02, CUA01–CUA03) " +
          "unificados en un shell con sidebar + drawer + state machine local. " +
          "Estado optimistic (local), sin red. R01/R02 contienen stubs marcados " +
          "para componentes que no existen en el DS.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ControlDeUsuarios>;

export const Default: Story = {};
