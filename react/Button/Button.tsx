import React from "react";
import { Icon, IconName } from "../Icon/Icon";

// ─── Types ────────────────────────────────────────────────────────────────────

/** Background color / semantic intent of the button */
export type ButtonColor = "green" | "red" | "white" | "black" | "gray";

/** Which side (if any) to place the icon */
export type ButtonLayout = "label" | "icon-left" | "icon-right" | "icon";

export type ButtonState = "standard" | "pressed" | "disabled";

// Legacy compat
export type ButtonVariant = "primary" | "secondary" | "disabled";

export interface ButtonProps {
  /** Button label text */
  label?: string;
  /** Background color — maps directly to Figma Color prop */
  color?: ButtonColor;
  /** Icon placement */
  layout?: ButtonLayout;
  /** Icon name (from Icon component) */
  icon?: IconName;
  /** Interaction state */
  state?: ButtonState;
  /** @deprecated Use color instead */
  variant?: ButtonVariant;
  onClick?: () => void;
  /** Full-width block */
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
}

// Map legacy variant → color
const VARIANT_COLOR: Record<ButtonVariant, ButtonColor> = {
  primary: "green",
  secondary: "black",
  disabled: "gray",
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Button({
  label = "Button",
  color,
  layout = "label",
  icon,
  state = "standard",
  variant,
  onClick,
  fullWidth = false,
  type = "button",
}: ButtonProps) {
  // Resolve color: explicit prop wins, then legacy variant, then default
  const resolvedColor: ButtonColor =
    color ?? (variant ? VARIANT_COLOR[variant] : "green");

  const isDisabled = state === "disabled" || resolvedColor === "gray";

  const classes = [
    "ds-btn",
    `ds-btn--${resolvedColor}`,
    `ds-btn--${state}`,
    layout !== "label" ? `ds-btn--layout-${layout}` : "",
    fullWidth ? "ds-btn--full" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const iconEl = icon ? (
    <Icon
      name={icon}
      size="md"
      color={resolvedColor === "green" ? "currentColor" : "currentColor"}
    />
  ) : null;

  return (
    <button
      type={type}
      className={classes}
      disabled={isDisabled}
      onClick={!isDisabled ? onClick : undefined}
      aria-disabled={isDisabled}
    >
      {(layout === "icon-left" || layout === "icon") && iconEl}
      {layout !== "icon" && label && (
        <span className="ds-btn__label">{label}</span>
      )}
      {layout === "icon-right" && iconEl}
    </button>
  );
}
