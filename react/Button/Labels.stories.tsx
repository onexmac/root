import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Button } from "./Button";

const meta: Meta = {
  title: "Button/Labels",
  parameters: { layout: "centered" },
};
export default meta;

export const LabelOnly: StoryObj = {
  name: "label",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 16, background: "black", borderRadius: 16 }}>
      <Button color="black" layout="label"      label="label"             state="standard" />
      <Button color="black" layout="icon-right" label="label" icon="forward" state="standard" />
      <Button color="black" layout="icon-left"  label="label" icon="forward" state="standard" />
    </div>
  ),
};

export const Label: StoryObj = {
  name: "label only",
  render: () => <Button color="black" layout="label" label="label" state="standard" />,
};

export const LabelIconRight: StoryObj = {
  name: "label + icon right",
  render: () => <Button color="black" layout="icon-right" label="label" icon="forward" state="standard" />,
};

export const IconLeftLabel: StoryObj = {
  name: "icon left + label",
  render: () => <Button color="black" layout="icon-left" label="label" icon="forward" state="standard" />,
};
