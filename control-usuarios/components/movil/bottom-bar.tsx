"use client";

import { motion } from "motion/react";
import { springs } from "@/lib/springs";
import { haptic } from "@/lib/haptic";
import { cn } from "@/lib/cn";

/**
 * BottomBar — the bottom-first control surface for the mobile usuarios list.
 *
 * Everything the screen can do lives here, in the thumb zone: the estado
 * filter on the left, and the green FAB (rendered by NuevoUsuarioSheet as its
 * collapsed state) occupying the right. The bar reserves that space with
 * padding so the two never collide.
 *
 * When the sheet opens the bar slides DOWN and fades, the same "get out of the
 * way" beat the P2 burger does when the morph leaves collapsed — one gesture
 * owns the screen at a time.
 */

export type EstadoFilter = "todos" | "activo" | "inactivo";

const FILTERS: { key: EstadoFilter; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "activo", label: "Activos" },
  { key: "inactivo", label: "Inactivos" },
];

// Room for the FAB: 84 wide at 24 from the edge, + 12 of breathing space.
const FAB_LANE = 84 + 24 + 12;

export function BottomBar<T extends string = EstadoFilter>({
  value,
  onChange,
  options,
  noun = ["usuario", "usuarios"],
  pillId = "movil-filter-pill",
  hidden = false,
  count,
}: {
  value: T;
  onChange: (v: T) => void;
  /** Defaults to the usuarios estado filter. */
  options?: { key: T; label: string }[];
  /** [singular, plural] for the live count. */
  noun?: [string, string];
  /** Own layoutId per screen, so two bars can't fight over one pill. */
  pillId?: string;
  /** Sheet is open — clear the stage. */
  hidden?: boolean;
  count: number;
}) {
  const items = options ?? (FILTERS as unknown as { key: T; label: string }[]);
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[45]">
      <motion.div
        initial={false}
        animate={{ y: hidden ? 120 : 0, opacity: hidden ? 0 : 1 }}
        transition={hidden ? springs.shrinking : springs.expanding}
        className="mx-auto max-w-[402px] px-4"
        style={{
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 24px)",
          paddingRight: FAB_LANE,
          pointerEvents: hidden ? "none" : "auto",
        }}
      >
        {/* Live count — ABOVE the bar: below it the text sat against the
            screen edge and read as clipped. */}
        <motion.span
          key={count}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springs.snappy}
          className="mb-2 block pl-3 text-[12px] font-medium text-gray-400"
        >
          {count} {count === 1 ? noun[0] : noun[1]}
        </motion.span>

        <div className="pointer-events-auto rounded-[24px] bg-charcoal p-1 shadow-big">
          <div
            className="relative grid"
            style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
          >
            {items.map((f) => {
              const active = f.key === value;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => {
                    haptic.select();
                    onChange(f.key);
                  }}
                  className="relative h-11 rounded-[20px] text-[13px] font-medium"
                >
                  {active ? (
                    // Sliding indicator — one shared element, so switching
                    // filters reads as the pill travelling rather than two
                    // separate fades.
                    <motion.span
                      layoutId={pillId}
                      transition={springs.morphing}
                      className="absolute inset-0 rounded-[20px] bg-green-100"
                    />
                  ) : null}
                  <span
                    className={cn(
                      "relative z-10 transition-colors duration-150",
                      active ? "font-semibold text-black" : "text-gray-300",
                    )}
                  >
                    {f.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </motion.div>
    </div>
  );
}
