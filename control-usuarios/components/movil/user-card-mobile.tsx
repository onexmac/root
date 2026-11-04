"use client";

import { AnimatePresence, motion } from "motion/react";
import { CaretLineUp, CheckCircle } from "@phosphor-icons/react";
import { Avatar } from "@/components/ds/avatar";
import { springs } from "@/lib/springs";
import { haptic } from "@/lib/haptic";
import { cn } from "@/lib/cn";
import type { User } from "@/lib/mock-users";

/**
 * UserCardMobile — the mobile counterpart of the desktop `cu-table__row`.
 * Collapsed it's a tappable card; expanded it reveals the record and two
 * actions.
 *
 * The signature move is the STATUS BADGE MORPH: collapsed, the state lives as
 * a filled check circle on the RIGHT; expanded, it becomes an "Activo" pill on
 * the LEFT. Both share a `layoutId`, so the black shape physically flies across
 * the header and morphs circle → capsule — the web equivalent of SwiftUI's
 * matchedGeometryEffect, same as the P2 mobile prototype.
 *
 * NOT-IN-DS: mobile collapsed↔expanded user card. Temp candidate.
 */

// Detail rows cascade in behind the expand, bottom-up on close.
const ROWS_IN = { staggerChildren: 0.05, delayChildren: 0.08 };
const ROWS_OUT = { staggerChildren: 0.03, staggerDirection: -1 as const };

const rowVariants = {
  collapsed: { opacity: 0, y: 8 },
  expanded: { opacity: 1, y: 0 },
};

export function UserCardMobile({
  user,
  expanded,
  onToggle,
}: {
  user: User;
  expanded: boolean;
  onToggle: () => void;
}) {
  const activo = user.estado === "activo";

  const rows: { label: string; value: string }[] = [
    { label: "Cédula", value: user.cedula },
    { label: "Contacto", value: user.contacto },
    { label: "Área", value: user.area },
    { label: "Rol", value: user.rol },
  ];

  return (
    <motion.article
      layout
      aria-expanded={expanded}
      transition={springs.expanding}
      className="overflow-hidden rounded-[24px] bg-white shadow-card"
    >
      {/* Header — the only tap target for the accordion, so taps on the
          expanded content (buttons) never collapse the card. Press feedback is
          a scale-shrink that springs back with overshoot: the house style for
          card-sized targets (a halo ring reads too subtle at this size). */}
      <motion.button
        type="button"
        whileTap={{ scale: 0.985 }}
        transition={springs.popping}
        onClick={() => {
          haptic.select();
          onToggle();
        }}
        className="flex w-full items-center gap-3 px-5 py-4 text-left"
      >
        <Avatar size={44} />

        <div className="min-w-0 flex-1">
          <span className="block truncate text-[18px] font-semibold text-black">
            {user.nombre}
          </span>
          {/* Sub-line trades places with the status pill: while collapsed it
              carries the área, expanded the pill takes over as the label. */}
          <AnimatePresence initial={false} mode="popLayout">
            {expanded ? (
              <motion.span
                key="pill"
                layoutId={`estado-${user.id}`}
                transition={springs.expanding}
                // Zero-duration exit: the layoutId registry still snapshots
                // these bounds so the circle animates FROM here, but no
                // crossfade ghost lingers behind the badge in flight.
                exit={{ opacity: 0, transition: { duration: 0 } }}
                className={cn(
                  "mt-1 inline-flex items-center gap-1.5 overflow-hidden whitespace-nowrap rounded-full py-1 pl-3 pr-2",
                  activo ? "bg-black text-white" : "bg-gray-200 text-gray-400",
                )}
              >
                {/* `layout` gives the children motion's scale correction, so
                    the text doesn't squash while the capsule interpolates. */}
                <motion.span
                  layout
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15, delay: 0.1 },
                  }}
                  className="text-[13px] font-semibold leading-none"
                >
                  {activo ? "Activo" : "Inactivo"}
                </motion.span>
                <motion.span layout className="inline-flex">
                  <CheckCircle size={16} weight="fill" />
                </motion.span>
              </motion.span>
            ) : (
              <motion.span
                key="area"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.08 } }}
                transition={springs.expanding}
                className="mt-0.5 block truncate text-[14px] text-gray-400"
              >
                {user.area} · {user.rol}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Right slot — the badge's collapsed home, and the collapse affordance
            once open. */}
        <span className="relative flex h-8 w-8 shrink-0 items-center justify-center">
          <AnimatePresence initial={false} mode="popLayout">
            {expanded ? (
              <motion.span
                key="caret"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.08 } }}
                transition={springs.snappy}
                className="absolute text-gray-300"
              >
                <CaretLineUp size={20} weight="bold" />
              </motion.span>
            ) : (
              <motion.span
                key="circle"
                layoutId={`estado-${user.id}`}
                transition={springs.expanding}
                exit={{ opacity: 0, transition: { duration: 0 } }}
                className={cn(
                  "absolute inline-flex items-center justify-center overflow-hidden rounded-full",
                  activo ? "bg-black text-white" : "bg-gray-200 text-gray-400",
                )}
                style={{ width: 28, height: 28 }}
              >
                <motion.span layout className="inline-flex">
                  <CheckCircle size={16} weight="fill" />
                </motion.span>
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </motion.button>

      {/* Detail — height 0 ↔ auto, no AnimatePresence: the card itself can
          never exit here, but keeping the reveal state-driven means there is
          no exit promise to resolve and no way to leave a node stranded. */}
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
        <motion.dl
          initial={false}
          animate={expanded ? "expanded" : "collapsed"}
          transition={expanded ? ROWS_IN : ROWS_OUT}
          className="flex flex-col gap-3 px-5 pb-1"
        >
          {rows.map((r) => (
            <motion.div
              key={r.label}
              variants={rowVariants}
              transition={springs.expanding}
              className="flex items-baseline justify-between gap-4"
            >
              <dt className="text-[14px] text-gray-400">{r.label}</dt>
              <dd className="truncate text-[15px] font-medium text-black">
                {r.value}
              </dd>
            </motion.div>
          ))}
        </motion.dl>

        <div className="flex items-center gap-3 px-5 pb-5 pt-4">
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            transition={springs.snappy}
            onClick={() => haptic.select()}
            className="h-11 flex-1 rounded-[16px] bg-white text-[14px] font-semibold tracking-[0.4px] text-black ring-1 ring-gray-200"
          >
            EDITAR
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            transition={springs.snappy}
            onClick={() => haptic.delete()}
            className="h-11 flex-1 rounded-[16px] bg-red-100/15 text-[14px] font-semibold tracking-[0.4px] text-red-200 ring-1 ring-red-100"
          >
            {activo ? "DESACTIVAR" : "ACTIVAR"}
          </motion.button>
        </div>
      </motion.div>
    </motion.article>
  );
}
