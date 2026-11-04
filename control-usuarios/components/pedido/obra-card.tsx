"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { DotsThreeVertical, Plus } from "@phosphor-icons/react";
import { springs } from "@/lib/springs";
import { haptic } from "@/lib/haptic";
import { useShake } from "@/lib/use-shake";
import { CARD_SHADOW } from "@/components/pedido/item-row";
import { SavingVeil } from "@/components/pedido/saving-veil";
import { obraMeta, type Obra } from "@/lib/mock-items";

/** Dwell before the código chip expands — long enough that merely passing
 *  over it on the way to the + never triggers the tooltip. */
const CHIP_HOVER_DELAY_MS = 300;

/**
 * Tooltip elevation — deliberately the SAME as the drag ghost's (item-row's
 * CARD_SHADOW, i.e. the DS `--shadow-big`), so every surface that lifts in
 * this panel lifts by the same amount. A bigger blur here read as the tooltip
 * floating far above the card while the dragged row barely left it.
 *
 * The flat twin keeps the 1 px ring and zeroes only the blur layers, which
 * keeps the keyframes interpolable (motion needs matching shadow-layer counts).
 */
const CHIP_LIFTED = CARD_SHADOW;
const CHIP_FLAT =
  "0 0 0 1px #d9d9d9, 0 2px 4px rgba(0,0,0,0), 0 0 6px rgba(0,0,0,0)";

/**
 * ObraCard — one obra group in the Nuevo Pedido Bodega tab: outlined código
 * chip + kebab header, item rows below. Lights up (green ring) while a
 * dragged item hovers over it as the drop target.
 */

export function ObraCard({
  obra,
  isDropTarget,
  saving = false,
  shakeSignal = 0,
  savingDelay = 0,
  onAssign,
  onAddMaterial,
  containerRef,
  children,
}: {
  obra: Obra;
  isDropTarget: boolean;
  /** Pedido is being sent — grow the green surface over THIS card. */
  saving?: boolean;
  /**
   * Increments when the user tries to solicit while blocked. If THIS box is
   * the one missing a código, its OBRA+ button shakes to point at the fix.
   */
  shakeSignal?: number;
  /** Stagger for this card in the panel-wide saving cascade (seconds). */
  savingDelay?: number;
  /** U09 → U10: assign a código to this box (the "OBRA +" button). */
  onAssign: () => void;
  /** U09/U10: green square + — add another material to THIS box. */
  onAddMaterial: () => void;
  containerRef: (el: HTMLElement | null) => void;
  children: React.ReactNode;
}) {
  // U09: no código yet → the green "OBRA +" button occupies the header slot.
  // U10: assigned → it becomes the outlined código chip.
  const assigned = obra.codigo !== null;
  const [hovered, setHovered] = useState(false);
  // Only the unassigned box answers the refusal — it's the missing step.
  const shakeControls = useShake(shakeSignal, !assigned);

  // Código chip → tooltip, gated by a 300 ms dwell.
  const [chipOpen, setChipOpen] = useState(false);
  const chipTimer = useRef<number | null>(null);
  const clearChipTimer = () => {
    if (chipTimer.current !== null) {
      window.clearTimeout(chipTimer.current);
      chipTimer.current = null;
    }
  };
  const onChipEnter = () => {
    clearChipTimer();
    chipTimer.current = window.setTimeout(() => {
      chipTimer.current = null;
      setChipOpen(true);
    }, CHIP_HOVER_DELAY_MS);
  };
  const onChipLeave = () => {
    // Cancels a dwell that hasn't fired yet AND closes one that has.
    clearChipTimer();
    setChipOpen(false);
  };
  // A pending timer must not fire after unmount (drag re-parents these cards).
  useEffect(() => clearChipTimer, []);

  const meta = (obra.codigo ? obraMeta[obra.codigo] : null) ?? {
    proyecto: "—",
    ref: "—",
    lote: "—",
  };
  return (
    <motion.section
      ref={containerRef}
      layout
      data-obra-id={obra.id}
      // Spring-grow + fade when a new box appears (AGREGAR MATERIALES /
      // AGREGAR OTRA OBRA) so it eases in instead of snapping.
      initial={{ opacity: 0, scale: 0.96, y: 8 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        boxShadow: isDropTarget
          ? "0 0 0 2px #add010, 0 4px 12px rgba(0,0,0,0.08)"
          : "0 0 0 1px #d9d9d9, 0 4px 12px rgba(0,0,0,0)",
      }}
      transition={{ ...springs.morphing, boxShadow: { duration: 0.15 } }}
      className="relative overflow-hidden rounded-[24px] bg-white"
    >
      {/* px-6 + gap-4 + a w-11 kebab reproduce the ROW's trailing metrics
          exactly (rows sit at ul px-1 + px-5 = 24 from the card edge, with a
          w-11 kebab and gap-4), so the green + lines up flush with the 0 UND
          field and both ⋮ share one column. */}
      <div className="flex items-center justify-between gap-4 px-6 pt-4">
        {/* Header slot — morphs OBRA+ button (U09) ⇄ código chip (U10). */}
        {assigned ? (
          // Hover the código ≥ 300 ms → the chip expands into a tooltip with
          // the obra's detail; leaving collapses it straight back. The delay is
          // what keeps it from firing while the pointer merely crosses the chip
          // on its way to the + or the rows.
          <motion.div
            onHoverStart={onChipEnter}
            onHoverEnd={onChipLeave}
            initial={false}
            animate={{
              width: chipOpen ? 424 : 96,
              boxShadow: chipOpen ? CHIP_LIFTED : CHIP_FLAT,
            }}
            transition={{ ...springs.morphing, boxShadow: { duration: 0.22 } }}
            // No `ring-1` class — the ring is in the boxShadow stack above so
            // the two can't double up into a heavier border while animating.
            className="relative h-12 shrink-0 overflow-hidden rounded-[8px] bg-white"
          >
            {/* Collapsed face — the código, centred. */}
            <motion.span
              initial={false}
              animate={{ opacity: chipOpen ? 0 : 1 }}
              transition={{ duration: chipOpen ? 0.1 : 0.2, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center text-body font-medium text-black"
            >
              {obra.codigo}
            </motion.span>

            {/* Expanded face — both layers are ABSOLUTE, so the width animation
                never reflows their contents (a flex row here would shove the
                código out of the clipped box while collapsed). */}
            <motion.div
              initial={false}
              animate={{ opacity: chipOpen ? 1 : 0 }}
              transition={{
                duration: chipOpen ? 0.24 : 0.1,
                ease: "easeOut",
                delay: chipOpen ? 0.06 : 0,
              }}
              className="pointer-events-none absolute inset-0 flex items-center justify-between whitespace-nowrap px-5 text-body"
            >
              <span className="text-gray-300">{meta.proyecto}</span>
              <span className="font-semibold text-black">{obra.codigo}</span>
              <span className="text-gray-300">{meta.ref}</span>
              <span className="text-black">{meta.lote}</span>
            </motion.div>
          </motion.div>
        ) : (
          // Shake lives on a WRAPPER: the button owns whileTap's transform,
          // and motion drops a competing x if both sit on one element.
          <motion.div animate={shakeControls}>
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              transition={springs.snappy}
              onClick={() => {
                haptic.select();
                onAssign();
              }}
              className="flex h-12 min-w-[220px] items-center justify-between gap-4 rounded-[16px] bg-green-100 px-6 text-[14px] font-semibold tracking-[0.4px] text-black"
            >
              OBRA
              <Plus size={20} weight="bold" />
            </motion.button>
          </motion.div>
        )}

        <span className="flex-1" aria-hidden />

        {/* Green + — grows on hover into a pill that reveals MATERIALES.
            Width animates with the same morph spring as the FAB, and the
            label is clipped (overflow-hidden) while collapsed. justify-end
            keeps the + pinned to the right edge so the pill opens leftward. */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.94 }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          initial={false}
          animate={{ width: hovered ? 186 : 48 }}
          // Shrinking is SEQUENCED: the label's 0.12 s fade runs first and the
          // width only starts collapsing at 0.14 s, so the text is fully gone
          // before the box can narrow over the +. Growing has no such wait.
          transition={{
            width: hovered
              ? springs.morphing
              : { ...springs.morphing, delay: 0.14 },
            scale: springs.snappy,
          }}
          onClick={() => {
            haptic.select();
            onAddMaterial();
          }}
          aria-label="Agregar materiales a esta obra"
          // The + is the ONLY child in flow, pinned right by pr-[13px]: at
          // width 48 its centre lands at 13+11 = 24 = exactly half, so it
          // reads centred; at 186 it sits at the right edge like OBRA+.
          // (A flex label with `gap` offset it — the gap kept its 12 px even
          // with the label collapsed to 0, overflowing 48 px and shoving the
          // + off-centre.)
          className="relative flex h-12 shrink-0 items-center justify-end overflow-hidden rounded-[16px] bg-green-100 pr-[13px] text-black"
        >
          {/* Label is ABSOLUTE — out of flow entirely, so it can never move
              the +. left-6 matches OBRA+'s text inset; clipped while collapsed. */}
          {/* Slides in from further left and slower, with a small delay: at
              0.16 s starting in place it read as the text materialising on top
              of the +. Now the pill opens first, then the label travels in from
              -18 px, so the two never visually overlap. `x` is a transform, so
              it can't affect the + either. */}
          <motion.span
            initial={false}
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -18 }}
            // ASYMMETRIC on purpose. Growing: wait 0.08 s for the pill to open,
            // then travel in over 0.3 s. Shrinking: get out FAST (0.12 s) —
            // with the same 0.3 s on the way out the width collapsed quicker
            // than the label faded, so the text was still on screen once the
            // box was narrow and it landed on top of the +.
            transition={
              hovered
                ? { duration: 0.3, ease: "easeOut", delay: 0.08 }
                : { duration: 0.12, ease: "easeIn" }
            }
            // Centred with flex, NOT -translate-y-1/2: motion owns this
            // element's transform for the slide-in and would overwrite the
            // Tailwind translate, dropping the label out of alignment.
            className="pointer-events-none absolute inset-y-0 left-6 flex items-center whitespace-nowrap text-[14px] font-semibold tracking-[0.4px]"
          >
            MATERIALES
          </motion.span>
          <Plus size={22} weight="bold" className="shrink-0" />
        </motion.button>

        <button
          type="button"
          aria-label={`Opciones de obra ${obra.codigo ?? "sin asignar"}`}
          onClick={() => haptic.select()}
          className="flex h-11 w-11 items-center justify-center rounded-[8px] text-gray-300 hover:bg-gray-100"
        >
          <DotsThreeVertical size={20} weight="bold" />
        </button>
      </div>

      <ul className="flex flex-col px-1 pb-1 pt-1">{children}</ul>

      {/* Green "sending" surface for THIS card — part of the panel-wide
          cascade (see SavingVeil + the delays in pedido-surface). */}
      <SavingVeil active={saving} delay={savingDelay} radius={24} />
    </motion.section>
  );
}
