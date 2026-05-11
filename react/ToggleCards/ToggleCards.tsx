import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { springs } from "../springs";
import "./ToggleCards.css";

export type ToggleCardsState = "standard" | "pressed";
export type ToggleCardsMode = "normal" | "disabled";
export type ToggleCardsSize = "big" | "small";
/** Matches Figma: "open" = card abierta (mostrar chevrons), "close" = card cerrada (mostrar flecha) */
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

/**
 * ToggleCards — botón negro con ícono que indica si la card está abierta o cerrada.
 * Mirrors Figma: size (big/small), visibility (open/close), state (standard/pressed).
 */
export function ToggleCards({
  state = "standard",
  mode = "normal",
  size = "big",
  visibility = "open",
  onClick,
  ariaLabel,
  className,
}: ToggleCardsProps) {
  return (
    <motion.button
      type="button"
      className={`ds-toggle ds-toggle--${size} ds-toggle--${state} ds-toggle--${mode} ds-toggle--${visibility}${className ? ` ${className}` : ""}`}
      disabled={mode === "disabled"}
      onClick={onClick}
      whileTap={mode === "disabled" ? undefined : { scale: 0.94 }}
      transition={springs.snappy}
      aria-label={ariaLabel ?? (visibility === "open" ? "Cerrar card" : "Abrir card")}
      aria-expanded={visibility === "open"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={visibility}
          className="ds-toggle__icon"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={springs.snappy}
        >
          {visibility === "open" ? <ChevronsIcon /> : <ArrowDownIcon />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

function ChevronsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7 10l5-5 5 5M7 14l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowDownIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
