import React from "react";
import { Button } from "../buttons/Button";

export type ToggleCardsState = "standard" | "pressed";
export type ToggleCardsMode = "normal" | "disabled";
export type ToggleCardsSize = "big" | "small";
export type ToggleCardsVisibility = "open" | "close";

export interface ToggleCardsProps {
  state?: ToggleCardsState;
  mode?: ToggleCardsMode;
  size?: ToggleCardsSize;
  visibility?: ToggleCardsVisibility;
  onClick?: () => void;
  ariaLabel?: string;
  className?: string;
}

const SIZE_STYLES: Record<ToggleCardsSize, React.CSSProperties> = {
  big:   { width: 60, height: 88, borderRadius: "var(--ds-radius-lg)" },
  small: { width: 60, height: 50, borderRadius: "var(--ds-radius-lg)" },
};

export function ToggleCards({
  mode = "normal",
  size = "big",
  visibility = "open",
  onClick,
  ariaLabel,
}: ToggleCardsProps) {
  return (
    <Button
      layout="icon"
      color={mode === "disabled" ? "gray" : "black"}
      state={mode === "disabled" ? "disabled" : "standard"}
      icon={visibility === "open" ? "open" : "close"}
      style={SIZE_STYLES[size]}
      ariaLabel={ariaLabel ?? (visibility === "open" ? "Cerrar card" : "Abrir card")}
      onClick={onClick}
    />
  );
}
