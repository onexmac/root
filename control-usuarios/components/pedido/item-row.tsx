"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { CaretLineUp, DotsThreeVertical } from "@phosphor-icons/react";
import { springs } from "@/lib/springs";
import { haptic } from "@/lib/haptic";
import type { PedidoItem } from "@/lib/mock-items";

/**
 * ItemRow — one item row inside an ObraCard, with the reference states:
 *
 *   rest       flat row, hairline divider below
 *   pressing   slight scale-down (large-row press feedback per taste memo)
 *   lifted     press-and-hold ≥ HOLD_MS → the PARENT renders a floating
 *              ghost that follows the pointer; this row dims (move) or
 *              stays (duplicate). Cross-obra drag is hand-rolled — motion's
 *              Reorder can't drag between groups, and its drag projection
 *              fights animated ancestors anyway.
 *   expanded   plain click → card expands: código + inventario detail,
 *              DUPLICAR / ELIMINAR actions; kebab ⋮ becomes collapse ↥
 *   dying      collapse-in-place while the parent filters it out (manual
 *              removal — AnimatePresence exits never resolved in the old
 *              Reorder tree, leaving ghost rows in the DOM)
 *
 * Modifier at pointerdown (ctrl, or option on macOS) → duplicate-drag: the
 * ghost carries a DUPLICAR badge and the drop inserts a copy.
 *
 * NOT-IN-DS: prototype-local pattern, Temp candidate.
 */

const HOLD_MS = 260;
const SLOP = 8;

// Card chrome — ring carried in the boxShadow stack so one animatable
// property covers ring + elevation; transparent twin keeps it interpolable.
export const CARD_SHADOW =
  "0 0 0 1px #d9d9d9, 0 2px 4px rgba(0,0,0,0.16), 0 0 6px rgba(0,0,0,0.16)";
export const FLAT_SHADOW =
  "0 0 0 1px rgba(217,217,217,0), 0 2px 4px rgba(0,0,0,0), 0 0 6px rgba(0,0,0,0)";

export type LiftStart = {
  item: PedidoItem;
  obraId: string;
  rect: { x: number; y: number; width: number; height: number };
  clientX: number;
  clientY: number;
  duplicate: boolean;
};

/**
 * RowHead — presentational head strip (name · variante pill · qty · kebab).
 * Shared by the live row and the drag ghost so they render identically.
 */
export function RowHead({
  item,
  expanded = false,
  onVariante,
  onKebab,
  headProps,
}: {
  item: PedidoItem;
  expanded?: boolean;
  onVariante?: () => void;
  onKebab?: () => void;
  headProps?: React.HTMLAttributes<HTMLDivElement>;
}) {
  return (
    <div
      {...headProps}
      className="flex h-[66px] items-center gap-4 px-5"
    >
      <span className="w-20 text-body text-black">{item.nombre}</span>

      {item.hasVariante ? (
        <motion.button
          type="button"
          whileTap={onVariante ? { scale: 0.96 } : undefined}
          transition={springs.snappy}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={onVariante}
          tabIndex={onVariante ? 0 : -1}
          className="h-11 rounded-[8px] bg-white px-6 text-[14px] font-semibold tracking-[0.4px] text-yellow ring-1 ring-gray-200"
        >
          AGREGAR VARIANTE
        </motion.button>
      ) : null}

      <span className="flex-1" aria-hidden />

      <div className="flex h-11 items-center gap-2 rounded-[8px] bg-white px-4 ring-1 ring-gray-200">
        <span className="font-medium text-yellow">{item.cantidad}</span>
        <span className="font-medium text-black">{item.unidad}</span>
      </div>

      {/* Kebab ⋮ — pointer-events-none: presses on it fall through to the
          HEAD's gesture, so hold-to-drag works from the dots too and a
          quick press toggles expand via the head's click path (one toggle
          path for pointers — the button's onClick would double-toggle).
          The button itself stays for KEYBOARD access: Tab + Enter/Space. */}
      <motion.button
        type="button"
        onClick={onKebab}
        tabIndex={onKebab ? 0 : -1}
        aria-label={expanded ? "Cerrar detalle" : "Abrir detalle"}
        aria-expanded={expanded}
        className="pointer-events-none flex h-11 w-11 items-center justify-center rounded-[8px] text-black"
      >
        {/* Icon swap as a STACKED opacity crossfade — never AnimatePresence.
            A nested AnimatePresence inside an exiting subtree (deleted row,
            drag ghost) blocks the parent's exit from ever resolving, which
            left ghost rows and a stuck drag ghost mounted forever. */}
        <span className="relative flex h-6 w-6 items-center justify-center">
          <motion.span
            initial={false}
            animate={{ opacity: expanded ? 0 : 1, scale: expanded ? 0.6 : 1 }}
            transition={springs.snappy}
            className="absolute flex"
          >
            <DotsThreeVertical size={22} weight="bold" />
          </motion.span>
          <motion.span
            initial={false}
            animate={{ opacity: expanded ? 1 : 0, scale: expanded ? 1 : 0.6 }}
            transition={springs.snappy}
            className="absolute flex"
          >
            <CaretLineUp size={20} weight="bold" className="text-gray-400" />
          </motion.span>
        </span>
      </motion.button>
    </div>
  );
}

type Press = "idle" | "pressing" | "lifted";

export function ItemRow({
  item,
  obraId,
  expanded,
  dying,
  ghosted,
  showDivider,
  onToggle,
  onDuplicate,
  onDelete,
  onLiftStart,
}: {
  item: PedidoItem;
  obraId: string;
  expanded: boolean;
  /** Row is being removed — collapse in place; parent filters it after. */
  dying: boolean;
  /** Row is the live move-drag source — dim it while the ghost flies. */
  ghosted: boolean;
  showDivider: boolean;
  onToggle: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  /**
   * Hold fired — hand the gesture OFF to the parent. From here the parent
   * tracks the pointer on WINDOW listeners: the live preview re-parents
   * this row's DOM node mid-drag (cross-obra), which destroys any pointer
   * capture held here and would freeze the gesture. The row must not own
   * the drag past this point.
   */
  onLiftStart: (s: LiftStart) => void;
}) {
  const liRef = useRef<HTMLLIElement>(null);
  const [press, setPress] = useState<Press>("idle");
  const holdTimer = useRef<number | null>(null);
  const downAt = useRef<{ x: number; y: number } | null>(null);
  // Latest pointer position while pressing — the lift starts from HERE, not
  // from the pointerdown spot, so press-and-pull picks up under the cursor.
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const movedPastSlop = useRef(false);
  const dupIntent = useRef(false);

  const clearHold = () => {
    if (holdTimer.current !== null) {
      window.clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 || dying) return;
    // ctrl-hold (or option on macOS) = duplicate-drag intent.
    dupIntent.current = e.ctrlKey || e.altKey;
    const head = e.currentTarget as HTMLElement;
    const pointerId = e.pointerId;
    // Capture during the PRESSING phase only, so slop/cancel tracking is
    // reliable. try/catch: capture throws for already-gone pointers (and
    // synthetic ones in tests) — never let it abort the gesture.
    try {
      head.setPointerCapture?.(pointerId);
    } catch {}
    downAt.current = { x: e.clientX, y: e.clientY };
    lastPos.current = { x: e.clientX, y: e.clientY };
    movedPastSlop.current = false;
    setPress("pressing");
    clearHold();
    holdTimer.current = window.setTimeout(() => {
      holdTimer.current = null;
      setPress("lifted");
      haptic.drag();
      // RELEASE the capture before handing off — the parent tracks the rest
      // of the gesture on window listeners (this row may re-parent mid-drag
      // and a held capture would die with it, freezing the ghost).
      try {
        head.releasePointerCapture?.(pointerId);
      } catch {}
      const rect = liRef.current?.getBoundingClientRect();
      const p = lastPos.current ?? downAt.current ?? { x: 0, y: 0 };
      onLiftStart({
        item,
        obraId,
        rect: rect
          ? { x: rect.x, y: rect.y, width: rect.width, height: rect.height }
          : { x: 0, y: 0, width: 320, height: 76 },
        clientX: p.x,
        clientY: p.y,
        duplicate: dupIntent.current,
      });
    }, HOLD_MS);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (press !== "pressing" || !downAt.current) return;
    // Track the pointer but NEVER cancel the hold on movement — real users
    // press-and-pull in one motion, and canceling here made the drag feel
    // dead ("drag doesn't work"). Movement only suppresses the click.
    lastPos.current = { x: e.clientX, y: e.clientY };
    const d = Math.hypot(
      e.clientX - downAt.current.x,
      e.clientY - downAt.current.y,
    );
    if (d > SLOP) movedPastSlop.current = true;
  };

  const onPointerUp = () => {
    clearHold();
    if (press === "pressing" && !movedPastSlop.current) {
      // Still press released before the hold → click → toggle expand.
      haptic.select();
      onToggle();
    }
    // "lifted" release is handled by the parent's window listeners.
    setPress("idle");
  };

  const onPointerCancel = () => {
    clearHold();
    setPress("idle"); // no toggle on cancel
  };

  return (
    <motion.li
      ref={liRef}
      data-row-id={item.id}
      layout
      // Spring-grow + fade on ENTER: a newly added material opens its own
      // height and settles with the expanding spring instead of popping into
      // place. Mirrors the `dying` collapse, so add/remove feel symmetric.
      initial={{ opacity: 0, height: 0, scale: 0.96 }}
      animate={
        dying
          ? { opacity: 0, scale: 0.92, height: 0 }
          : {
              opacity: 1,
              height: "auto",
              scale: press === "pressing" ? 0.99 : 1,
              backgroundColor: expanded ? "#ffffff" : "rgba(255,255,255,0)",
              borderRadius: expanded ? 16 : 0,
              boxShadow: expanded ? CARD_SHADOW : FLAT_SHADOW,
            }
      }
      transition={
        dying
          ? springs.deleting
          : { ...springs.morphing, scale: springs.snappy, opacity: { duration: 0.15 } }
      }
      style={{
        position: "relative",
        overflow: "hidden",
        zIndex: expanded ? 10 : 0,
        pointerEvents: dying ? "none" : undefined,
      }}
      className="select-none"
    >
      {/* Row content — fades out while this row is the move-drag source;
          the gray drop placeholder below shows the landing slot instead
          (per the mid-drag reference). */}
      <motion.div
        initial={false}
        animate={{ opacity: ghosted ? 0 : 1 }}
        transition={{ duration: 0.12 }}
      >
        <RowHead
          item={item}
          expanded={expanded}
          onVariante={() => haptic.select()}
          onKebab={() => {
            haptic.select();
            onToggle();
          }}
          headProps={{
            onPointerDown,
            onPointerMove,
            onPointerUp,
            onPointerCancel,
            style: { touchAction: "none", cursor: "grab" },
          }}
        />
      </motion.div>

      {/* Drop placeholder — the empty gray slot where the element will
          land. Tracks the live-preview position automatically because it
          lives inside the dragged row's own li. */}
      <motion.div
        aria-hidden
        initial={false}
        animate={{ opacity: ghosted ? 1 : 0 }}
        transition={{ duration: 0.15 }}
        // top-[11px]: (66px row − 44px slot) / 2 — explicit offset, no
        // translate class (motion owns this element's transform).
        className="pointer-events-none absolute inset-x-3 top-[11px] h-11 rounded-[16px] bg-gray-100"
      />

      {/* Detail — always mounted, height-animated 0 ↔ auto (no exit clones). */}
      <motion.div
        initial={false}
        animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
        transition={springs.expanding}
        // pointer-events via className, NOT the style prop — motion doesn't
        // reliably re-apply conditional plain values in `style`.
        className={
          expanded
            ? "overflow-hidden pointer-events-auto"
            : "overflow-hidden pointer-events-none"
        }
        aria-hidden={!expanded}
      >
        <div className="flex items-center justify-between px-5 pb-1">
          <span className="text-body text-gray-400">{item.codigo}</span>
          <span className="pr-16 text-body text-gray-400">{item.inventario}</span>
        </div>
        <div className="flex items-center justify-end gap-3 px-5 pb-5 pt-3">
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            transition={springs.snappy}
            onClick={() => {
              haptic.complete();
              onDuplicate();
            }}
            className="h-11 rounded-[16px] bg-white px-6 text-[14px] font-semibold tracking-[0.4px] text-green-200 ring-1 ring-green-200"
          >
            DUPLICAR
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            transition={springs.snappy}
            onClick={() => {
              haptic.delete();
              onDelete();
            }}
            className="h-11 rounded-[16px] bg-red-100/15 px-6 text-[14px] font-semibold tracking-[0.4px] text-red-200 ring-1 ring-red-100"
          >
            ELIMINAR
          </motion.button>
        </div>
      </motion.div>

      {/* Hairline divider — hidden on the last row and while carded. */}
      {showDivider ? (
        <motion.div
          aria-hidden
          animate={{ opacity: expanded ? 0 : 1 }}
          transition={{ duration: 0.15 }}
          className="absolute inset-x-0 bottom-0 h-px bg-gray-200"
        />
      ) : null}
    </motion.li>
  );
}
