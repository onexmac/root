import React from "react";

export type QuantitySelectorState =
  | "incompleto"
  | "pendiente"
  | "completo"
  | "sin-stock";

export type QuantitySelectorMode = "standard" | "pressed";

export interface QuantitySelectorProps {
  /** Stock / completion state — controls background color */
  state?: QuantitySelectorState;
  /** Interaction mode */
  mode?: QuantitySelectorMode;
  /** Current quantity */
  qty?: number;
  onQtyChange?: (qty: number) => void;
  /** Read-only: just show the number, no +/- buttons */
  readOnly?: boolean;
}

const STATE_COLORS: Record<QuantitySelectorState, string> = {
  incompleto:  "var(--ds-color-yellow)",
  pendiente:   "var(--ds-color-gray-200)",
  completo:    "var(--ds-color-green-100)",
  "sin-stock": "var(--ds-color-red-100)",
};

export function QuantitySelector({
  state = "pendiente",
  mode = "standard",
  qty = 0,
  onQtyChange,
  readOnly = false,
}: QuantitySelectorProps) {
  const bg = STATE_COLORS[state];

  const decrement = () => onQtyChange && onQtyChange(Math.max(0, qty - 1));
  const increment = () => onQtyChange && onQtyChange(qty + 1);

  return (
    <div
      className={`ds-qty ds-qty--${state} ds-qty--${mode}`}
      style={{ "--qty-bg": bg } as React.CSSProperties}
    >
      {!readOnly && (
        <button className="ds-qty__btn" onClick={decrement} aria-label="Decrease">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </button>
      )}
      <span className="ds-qty__value">{qty}</span>
      {!readOnly && (
        <button className="ds-qty__btn" onClick={increment} aria-label="Increase">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}
