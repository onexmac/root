"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import { CaretDown, CaretUp, CheckCircle } from "@phosphor-icons/react";
import { Tag } from "@/components/ds/tag";
import { springs } from "@/lib/springs";
import { haptic } from "@/lib/haptic";
import { cn } from "@/lib/cn";
import type { Worker } from "@/lib/mock-workers";

const cardTransition = springs.expanding;

const cascadeContainer: Variants = {
  collapsed: {
    transition: { staggerChildren: 0.03, staggerDirection: -1 },
  },
  expanded: {
    transition: { delayChildren: 0.08, staggerChildren: 0.05 },
  },
};

const cascadeItem: Variants = {
  collapsed: { opacity: 0, y: -6 },
  expanded: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 320, damping: 28 },
  },
};

export function WorkerCard({
  worker,
  expanded,
  onToggle,
}: {
  worker: Worker;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      layout
      transition={cardTransition}
      className="relative w-full overflow-hidden rounded-md bg-white px-5 py-5 shadow-card"
    >
      {/* Top row reshapes based on `expanded`. Motion's `layout` on this row
          captures before/after bounding boxes and animates the rearrangement
          of its children (the badge and the toggle) automatically. */}
      <motion.div
        layout
        transition={cardTransition}
        className={cn(
          "flex items-center gap-3",
          expanded ? "justify-between" : "justify-between",
        )}
      >
        {/* Left side: name (collapsed) or Activo badge (expanded).
            Crossfade with a slight offset, no layoutId — keeps motion stable. */}
        <div className="relative flex min-h-[28px] min-w-0 flex-1 items-center">
          <AnimatePresence initial={false} mode="popLayout">
            {expanded ? (
              <motion.div
                key="activo"
                initial={{ opacity: 0, scale: 0.85, x: 8 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.85, x: 8 }}
                transition={cardTransition}
              >
                <Tag variant="active" withCheck>
                  Activo
                </Tag>
              </motion.div>
            ) : (
              <motion.span
                key="name"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="block w-full truncate text-[20px] font-semibold text-black"
              >
                {worker.nombre}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Right side: check icon (collapsed) + toggle. The check fades out
            and a slight rotate-out feels like it's "morphing" toward the
            Activo badge that's appearing on the left. */}
        <div className="flex shrink-0 items-center gap-3">
          <AnimatePresence initial={false} mode="popLayout">
            {!expanded && (
              <motion.div
                key="check"
                initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.6, rotate: 90 }}
                transition={cardTransition}
                className="flex h-7 w-7 items-center justify-center text-black"
              >
                <CheckCircle size={28} weight="regular" />
              </motion.div>
            )}
          </AnimatePresence>
          <ToggleButton expanded={expanded} onClick={onToggle} />
        </div>
      </motion.div>

      {/* Body — height + cascade rows */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="body"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={cardTransition}
            className="overflow-hidden"
          >
            <motion.div
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              variants={cascadeContainer}
              className="pt-5"
            >
              <motion.h3
                variants={cascadeItem}
                className="text-[22px] font-semibold leading-tight text-black"
              >
                {worker.nombre}
              </motion.h3>

              <div className="mt-6 flex flex-col gap-4">
                <Row label="Area" value={worker.area} />
                <Row label="Rol" value={worker.rolPrimary} />
                <Row label="Obras" value={worker.obraPrimary} withChevron connectAbove />
                {worker.rolSecondary && (
                  <Row label="Rol" value={worker.rolSecondary} />
                )}
                {worker.obraSecondary && (
                  <Row label="Obras" value={worker.obraSecondary} connectAbove />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Row({
  label,
  value,
  withChevron,
  connectAbove,
}: {
  label: string;
  value: string;
  withChevron?: boolean;
  connectAbove?: boolean;
}) {
  return (
    <motion.div
      variants={cascadeItem}
      className="relative grid grid-cols-[80px_1fr] items-center gap-3"
    >
      <div className="relative">
        {connectAbove && (
          <span className="absolute -top-4 left-1 h-4 w-px bg-gray-300" />
        )}
        <span className="text-[16px] font-semibold text-black">{label}</span>
      </div>
      <div className="flex items-center">
        <Tag variant="roleIdle" className="text-[14px]">
          <span className="flex items-center gap-2">
            {value}
            {withChevron && <CaretDown size={14} weight="bold" />}
          </span>
        </Tag>
      </div>
    </motion.div>
  );
}

function ToggleButton({
  expanded,
  onClick,
}: {
  expanded: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={() => {
        haptic.select();
        onClick();
      }}
      whileTap={{ scale: 0.94 }}
      transition={springs.snappy}
      className="flex h-12 w-16 items-center justify-center rounded-md bg-black text-white"
      aria-label={expanded ? "Colapsar" : "Expandir"}
    >
      {expanded ? (
        <CaretDown size={16} weight="bold" />
      ) : (
        <div className="flex flex-col items-center gap-0.5">
          <CaretUp size={12} weight="bold" />
          <CaretDown size={12} weight="bold" />
        </div>
      )}
    </motion.button>
  );
}
