import React from "react";
import { Button } from "../Button/Button";
import { Icon } from "../Icon/Icon";

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

/**
 * ToggleCards — the black squircle toggle used on SelectionDropdown and
 * on UserCard chevrons.
 *
 * Icon swap is a **3D card flip** (rotateY around the vertical axis), not
 * a cross-fade. Both icons live at full opacity through the entire
 * transition — one is on the front face, the other on the back face. The
 * container rotates 0° → 180°; at the midpoint of the rotation each icon
 * is edge-on to the viewer (visually invisible due to flat geometry), and
 * past 90° the back face takes over. No fade frame ever shows a
 * half-transparent icon — the chevrons spin into each other, not through
 * each other.
 *
 * Implementation:
 *   • `perspective` on the container so rotateY reads as a real 3D flip.
 *   • `transform-style: preserve-3d` on the inner so children render in
 *     3D space, not flattened back into 2D.
 *   • `backface-visibility: hidden` on each face — the front face
 *     vanishes once it's facing away from the viewer (past 90°), letting
 *     the back face (rotated -180° relative to the inner) take over.
 *   • `cubic-bezier(0.34, 1.56, 0.64, 1)` for a slight overshoot at the
 *     end — same easing the brand uses on `springs.snappy`-style taps.
 */
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
      style={SIZE_STYLES[size]}
      ariaLabel={ariaLabel ?? (visibility === "open" ? "Cerrar card" : "Abrir card")}
      onClick={onClick}
    >
      <span
        aria-hidden
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 24,
          height: 24,
          // 3D perspective context — needs to live on the parent of the
          // rotating element, not on the element itself.
          perspective: 320,
        }}
      >
        <span
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
            transform:
              visibility === "close" ? "rotateY(180deg)" : "rotateY(0deg)",
            transition: "transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {/* Front face — `open` icon, facing the viewer at rotation 0. */}
          <span
            style={{
              position: "absolute",
              inset: 0,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <Icon name="open" size="md" color="currentColor" />
          </span>

          {/* Back face — `close` icon, pre-rotated 180° so it reads
              right-side-up once the parent has rotated. */}
          <span
            style={{
              position: "absolute",
              inset: 0,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <Icon name="close" size="md" color="currentColor" />
          </span>
        </span>
      </span>
    </Button>
  );
}
