import React, { useRef, useState } from "react";
import { Icon, IconName } from "../Icon/Icon";
import { haptic } from "../haptic";

// Halo colors — muted/darker shade of each button fill (never contrasting)
const HALO_COLOR: Record<ButtonColor, string> = {
  green: "rgb(133, 166, 41)",
  black: "rgb(140, 140, 140)",
  white: "rgb(209, 209, 209)",
  red:   "rgb(180, 100, 100)",
  gray:  "transparent",
};

// Must match --ds-radius-lg = 16px
const BTN_RADIUS = 16;
const HALO_WIDTH = 8;

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
      color="currentColor"
    />
  ) : null;

  const [pressed, setPressed] = useState(false);
  const cancelled = useRef(false);

  return (
    <button
      type={type}
      className={classes}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      style={{
        position: "relative",
        WebkitTapHighlightColor: "transparent",
        touchAction: "manipulation",
      }}
      onPointerDown={(e) => {
        if (isDisabled) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        cancelled.current = false;
        setPressed(true);
        haptic.select();
      }}
      onPointerUp={() => {
        if (isDisabled) return;
        setPressed(false);
        if (!cancelled.current) {
          setTimeout(() => onClick?.(), 100);
        }
      }}
      onPointerLeave={() => {
        if (pressed) {
          cancelled.current = true;
          setPressed(false);
        }
      }}
      onPointerCancel={() => {
        cancelled.current = true;
        setPressed(false);
      }}
    >
      {(layout === "icon-left" || layout === "icon") && iconEl}
      {layout !== "icon" && label && (
        <span className="ds-btn__label">{label}</span>
      )}
      {layout === "icon-right" && iconEl}

      {/* Halo overlay — 80ms in / 180ms out 120ms hold. Sits OUTSIDE the button. */}
      {!isDisabled && (
        <span
          aria-hidden
          style={{
            position: "absolute",
            inset: -HALO_WIDTH,
            borderRadius: BTN_RADIUS + HALO_WIDTH,
            border: `${HALO_WIDTH}px solid ${HALO_COLOR[resolvedColor]}`,
            pointerEvents: "none",
            opacity: pressed ? 1 : 0,
            transition: pressed
              ? "opacity 80ms ease-out"
              : "opacity 180ms ease-out 120ms",
          }}
        />
      )}
    </button>
  );
}
