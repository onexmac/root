"use client";

import { motion } from "motion/react";
import { CaretLineUp, DotsThreeVertical } from "@phosphor-icons/react";
import { springs } from "@/lib/springs";
import { haptic } from "@/lib/haptic";
import { cn } from "@/lib/cn";
import type { PedidoItem } from "@/lib/mock-items";

/**
 * MaterialRowMovil — the narrow counterpart of `pedido/item-row`.
 *
 * Separate component on purpose: the desktop row puts nombre + AGREGAR
 * VARIANTE + qty + kebab on ONE line, which needs ~380 px of head. At 343 px
 * of usable width that overflows, so here the variante action moves into the
 * expanded detail and the head keeps only what a thumb needs to scan.
 *
 * Cross-obra drag is deliberately NOT ported: hold-and-drag between boxes is a
 * pointer affordance that fights list scrolling on a phone. DUPLICAR / ELIMINAR
 * in the detail cover the same intents.
 */
export function MaterialRowMovil({
  item,
  expanded,
  dying,
  showDivider,
  onToggle,
  onDuplicate,
  onDelete,
}: {
  item: PedidoItem;
  expanded: boolean;
  dying: boolean;
  showDivider: boolean;
  onToggle: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={
        dying
          ? { opacity: 0, height: 0, scale: 0.96 }
          : { opacity: 1, height: "auto", scale: 1 }
      }
      transition={dying ? springs.deleting : springs.morphing}
      className="relative overflow-hidden"
      style={{ pointerEvents: dying ? "none" : undefined }}
    >
      <motion.button
        type="button"
        whileTap={{ scale: 0.99 }}
        transition={springs.snappy}
        onClick={() => {
          haptic.select();
          onToggle();
        }}
        className="flex h-[60px] w-full items-center gap-3 px-4 text-left"
      >
        <span className="min-w-0 flex-1 truncate text-[15px] text-black">
          {item.nombre}
        </span>

        <span className="flex h-9 items-center gap-1.5 rounded-[8px] bg-white px-3 ring-1 ring-gray-200">
          <span className="text-[15px] font-medium text-yellow">
            {item.cantidad}
          </span>
          <span className="text-[13px] font-medium text-black">
            {item.unidad}
          </span>
        </span>

        {/* Icon swap as stacked opacity — never a nested AnimatePresence
            inside a subtree that can exit (MOTION_GOTCHAS.md #5). */}
        <span className="relative flex h-9 w-6 shrink-0 items-center justify-center">
          <motion.span
            initial={false}
            animate={{ opacity: expanded ? 0 : 1, scale: expanded ? 0.6 : 1 }}
            transition={springs.snappy}
            className="absolute flex text-black"
          >
            <DotsThreeVertical size={20} weight="bold" />
          </motion.span>
          <motion.span
            initial={false}
            animate={{ opacity: expanded ? 1 : 0, scale: expanded ? 1 : 0.6 }}
            transition={springs.snappy}
            className="absolute flex text-gray-300"
          >
            <CaretLineUp size={18} weight="bold" />
          </motion.span>
        </span>
      </motion.button>

      <motion.div
        initial={false}
        animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
        transition={springs.expanding}
        className={cn(
          "overflow-hidden",
          expanded ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!expanded}
      >
        <div className="flex items-center justify-between px-4 pb-3">
          <span className="text-[13px] text-gray-300">{item.codigo}</span>
          <span className="text-[13px] text-gray-300">{item.inventario}</span>
        </div>

        <div className="px-4 pb-4">
          {item.hasVariante ? (
            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              transition={springs.snappy}
              onClick={() => haptic.select()}
              className="mb-2 h-11 w-full rounded-[8px] bg-white text-[13px] font-semibold tracking-[0.4px] text-yellow ring-1 ring-gray-200"
            >
              AGREGAR VARIANTE
            </motion.button>
          ) : null}
          <div className="flex items-center gap-2">
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              transition={springs.snappy}
              onClick={() => {
                haptic.complete();
                onDuplicate();
              }}
              className="h-11 flex-1 rounded-[16px] bg-white text-[13px] font-semibold tracking-[0.4px] text-green-200 ring-1 ring-green-200"
            >
              DUPLICAR
            </motion.button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              transition={springs.snappy}
              onClick={() => {
                haptic.delete();
                onDelete();
              }}
              className="h-11 flex-1 rounded-[16px] bg-red-100/15 text-[13px] font-semibold tracking-[0.4px] text-red-200 ring-1 ring-red-100"
            >
              ELIMINAR
            </motion.button>
          </div>
        </div>
      </motion.div>

      {showDivider ? (
        <motion.span
          aria-hidden
          animate={{ opacity: expanded ? 0 : 1 }}
          transition={{ duration: 0.15 }}
          className="absolute inset-x-4 bottom-0 block h-px bg-gray-200"
        />
      ) : null}
    </motion.li>
  );
}
