"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { DotsThreeVertical, Plus } from "@phosphor-icons/react";
import { SavingVeil } from "@/components/pedido/saving-veil";
import { springs } from "@/lib/springs";
import { haptic } from "@/lib/haptic";
import { useShake } from "@/lib/use-shake";
import { cn } from "@/lib/cn";
import { obraMeta, type Obra } from "@/lib/mock-items";

/**
 * ObraBoxMovil — narrow counterpart of `pedido/obra-card`.
 *
 * Same two header states (green OBRA+ while unassigned → código chip once
 * assigned) and the same green + for adding materials. The difference is the
 * obra DETAIL: the desktop chip widens into a 424 px tooltip on hover, which
 * neither fits 343 px nor has a hover to hang off. Here TAPPING the chip drops
 * the same proyecto · ref · lote strip under the header.
 */
export function ObraBoxMovil({
  obra,
  saving,
  savingDelay = 0,
  shakeSignal = 0,
  onAssign,
  onAddMaterial,
  children,
}: {
  obra: Obra;
  saving: boolean;
  savingDelay?: number;
  shakeSignal?: number;
  onAssign: () => void;
  onAddMaterial: () => void;
  children: React.ReactNode;
}) {
  const assigned = obra.codigo !== null;
  const [detailOpen, setDetailOpen] = useState(false);
  const shake = useShake(shakeSignal, !assigned);

  const meta = (obra.codigo ? obraMeta[obra.codigo] : null) ?? {
    proyecto: "—",
    ref: "—",
    lote: "—",
  };

  return (
    <motion.section
      layout
      initial={{ opacity: 0, scale: 0.97, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={springs.morphing}
      className="relative overflow-hidden rounded-[24px] bg-white"
      style={{ boxShadow: "0 0 0 1px #d9d9d9" }}
    >
      <div className="flex items-center gap-3 px-4 pt-4">
        {assigned ? (
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            transition={springs.snappy}
            onClick={() => {
              haptic.select();
              setDetailOpen((v) => !v);
            }}
            aria-expanded={detailOpen}
            className="flex h-11 min-w-[84px] items-center justify-center rounded-[8px] bg-white px-4 text-[15px] font-medium text-black ring-1 ring-gray-200"
          >
            {obra.codigo}
          </motion.button>
        ) : (
          // Shake on a wrapper: the button owns whileTap's transform (#10).
          <motion.div animate={shake} className="flex-1">
            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              transition={springs.snappy}
              onClick={() => {
                haptic.select();
                onAssign();
              }}
              className="flex h-11 w-full items-center justify-between rounded-[16px] bg-green-100 px-5 text-[13px] font-semibold tracking-[0.4px] text-black"
            >
              OBRA
              <Plus size={18} weight="bold" />
            </motion.button>
          </motion.div>
        )}

        {assigned ? <span className="flex-1" aria-hidden /> : null}

        <motion.button
          type="button"
          whileTap={{ scale: 0.94 }}
          transition={springs.snappy}
          onClick={() => {
            haptic.select();
            onAddMaterial();
          }}
          aria-label="Agregar material"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] bg-green-100 text-black"
        >
          <Plus size={20} weight="bold" />
        </motion.button>

        <button
          type="button"
          aria-label={`Opciones de obra ${obra.codigo ?? "sin asignar"}`}
          onClick={() => haptic.select()}
          className="flex h-11 w-6 shrink-0 items-center justify-center rounded-[8px] text-gray-300"
        >
          <DotsThreeVertical size={20} weight="bold" />
        </button>
      </div>

      {/* Obra detail — tap-driven on mobile, height reveal instead of a width
          morph so it can never exceed the card. */}
      <motion.div
        initial={false}
        animate={{
          height: detailOpen && assigned ? "auto" : 0,
          opacity: detailOpen && assigned ? 1 : 0,
        }}
        transition={springs.expanding}
        className="overflow-hidden"
        aria-hidden={!detailOpen}
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 px-4 pt-3 text-[13px]">
          <span className="text-gray-300">{meta.proyecto}</span>
          <span className="text-gray-200">·</span>
          <span className="text-gray-300">{meta.ref}</span>
          <span className="text-gray-200">·</span>
          <span className="text-black">{meta.lote}</span>
        </div>
      </motion.div>

      <ul className="flex flex-col pt-2">{children}</ul>

      <SavingVeil active={saving} delay={savingDelay} radius={24} />
    </motion.section>
  );
}
