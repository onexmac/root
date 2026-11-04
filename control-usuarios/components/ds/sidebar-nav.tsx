"use client";

import { useState } from "react";
import {
  CaretDown,
  CaretLeft,
  Pulse,
  SlidersHorizontal,
  SquaresFour,
} from "@phosphor-icons/react";
import { motion } from "motion/react";
import { springs } from "@/lib/springs";
import { haptic } from "@/lib/haptic";
import { cn } from "@/lib/cn";

/**
 * SidebarNav — wide project sidebar per the redesign reference:
 *
 *   · Dashboard / Proyecto rows (icon chip + label)
 *   · Collapsible group panels on a lighter charcoal card — "Algo Algo"
 *     open with its items (Pedidos active as a green pill), "Otra Cosa"
 *     and "Another Place" collapsed
 *   · Red notification dots on flagged items/groups
 *   · Pinned bottom user row: initials chip + name + quick actions
 *
 * Groups expand/collapse with a height 0 ↔ auto motion (never an
 * AnimatePresence exit — see pedido/item-row.tsx for the scar tissue).
 * Keeps the original `{ active, onSelect }` API for compatibility.
 */

// Notification red from the reference — brighter than the DS red-100
// (#c96c6c reads dusty). NOT-IN-DS: flag for token review.
const NOTIF_RED = "#F0524A";

type NavItem = { key: string; label: string; dot?: boolean };
type NavGroup = {
  key: string;
  label: string;
  dot?: boolean;
  items: NavItem[];
  defaultOpen?: boolean;
};

const GROUPS: NavGroup[] = [
  {
    key: "algo-algo",
    label: "Algo Algo",
    defaultOpen: true,
    items: [
      { key: "pedidos", label: "Pedidos", dot: true },
      { key: "ordenes", label: "Ordenes" },
      { key: "obras", label: "Obras", dot: true },
      { key: "cuadrillas", label: "Cuadrillas" },
      { key: "site-profile", label: "Site Profile" },
    ],
  },
  { key: "otra-cosa", label: "Otra Cosa", dot: true, items: [] },
  { key: "another-place", label: "Another Place", items: [] },
];

function Dot() {
  return (
    <span
      aria-label="Notificaciones"
      className="block h-2.5 w-2.5 shrink-0 rounded-full"
      style={{ background: NOTIF_RED }}
    />
  );
}

export function SidebarNav({
  active = "pedidos",
  onSelect,
}: {
  active?: string;
  onSelect?: (key: string) => void;
}) {
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(GROUPS.map((g) => [g.key, !!g.defaultOpen])),
  );

  const toggle = (key: string) => {
    haptic.select();
    setOpen((cur) => ({ ...cur, [key]: !cur[key] }));
  };

  return (
    <nav className="flex h-screen w-[280px] shrink-0 flex-col bg-black px-4 pb-6 pt-8">
      {/* Top-level rows */}
      <TopRow icon={<Pulse size={20} weight="bold" color="#fff" />} label="Dashboard" muted />
      <TopRow
        icon={<SquaresFour size={20} weight="fill" color="#ADD010" />}
        label="Proyecto"
      />

      {/* Group panels */}
      <div className="mt-4 flex flex-col gap-3">
        {GROUPS.map((group) => {
          const isOpen = !!open[group.key];
          return (
            <div key={group.key} className="rounded-2xl bg-white/[0.08] p-2">
              <motion.button
                type="button"
                whileTap={{ scale: 0.98 }}
                transition={springs.snappy}
                onClick={() => toggle(group.key)}
                aria-expanded={isOpen}
                className="flex h-10 w-full items-center gap-3 rounded-xl px-3 text-left"
              >
                <motion.span
                  initial={false}
                  animate={{ rotate: isOpen ? 0 : 180 }}
                  transition={springs.snappy}
                  className="flex text-white"
                >
                  <CaretDown size={14} weight="bold" />
                </motion.span>
                <span className="flex-1 text-[15px] font-medium text-white">
                  {group.label}
                </span>
                {group.dot ? <Dot /> : null}
              </motion.button>

              {/* Items — height-animated reveal, no unmount. */}
              <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={springs.expanding}
                className={cn(
                  "overflow-hidden",
                  isOpen ? "pointer-events-auto" : "pointer-events-none",
                )}
                aria-hidden={!isOpen}
              >
                <ul className="flex flex-col gap-1 pb-2 pt-1">
                  {group.items.map((item) => {
                    const isActive = item.key === active;
                    return (
                      <li key={item.key} className="relative flex justify-center">
                        <motion.button
                          type="button"
                          whileTap={{ scale: 0.95 }}
                          transition={springs.snappy}
                          onClick={() => {
                            haptic.select();
                            onSelect?.(item.key);
                          }}
                          className={cn(
                            "flex h-9 items-center justify-center rounded-full px-6 text-[15px]",
                            isActive
                              ? "bg-green-100 font-semibold text-black"
                              : "font-medium text-white hover:bg-white/10",
                          )}
                        >
                          {item.label}
                        </motion.button>
                        {item.dot ? (
                          <span className="absolute right-2 top-1/2 -translate-y-1/2">
                            <Dot />
                          </span>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Bottom user row — pinned */}
      <div className="mt-auto">
        <div className="mb-4 h-px bg-white/15" />
        <div className="flex items-center gap-3 px-1">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100 text-[12px] font-bold text-black">
            PC
          </span>
          <span className="flex-1 text-[15px] font-semibold tracking-[0.4px] text-white">
            DAVID
          </span>
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            transition={springs.snappy}
            onClick={() => haptic.select()}
            aria-label="Preferencias"
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-300 hover:bg-white/10"
          >
            <SlidersHorizontal size={18} weight="bold" />
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            transition={springs.snappy}
            onClick={() => haptic.select()}
            aria-label="Colapsar menú"
            className="flex h-9 w-9 items-center justify-center rounded-full text-white hover:bg-white/10"
          >
            <CaretLeft size={18} weight="bold" />
          </motion.button>
        </div>
      </div>
    </nav>
  );
}

function TopRow({
  icon,
  label,
  muted = false,
}: {
  icon: React.ReactNode;
  label: string;
  muted?: boolean;
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.98 }}
      transition={springs.snappy}
      onClick={() => haptic.select()}
      className="flex h-12 w-full items-center gap-3 rounded-xl px-2 text-left hover:bg-white/5"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.08]">
        {icon}
      </span>
      <span
        className={cn(
          "text-[16px] font-medium",
          muted ? "text-gray-300" : "text-white",
        )}
      >
        {label}
      </span>
    </motion.button>
  );
}
