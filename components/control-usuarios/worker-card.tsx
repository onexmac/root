"use client";

/**
 * UserCard — exported as `WorkerCard` for back-compat. Mirrors P2_SPEC.md §3.1.
 *
 * Two states (P2_SPEC.md §3.1):
 *
 * Collapsed:
 *   [ shortName ]  ......spacer......  [ ✓ icon if isCompleted ]  [ ChevronToggle ▲▼ ]
 *
 * Expanded:
 *   [ Activo pill ]  ......spacer......  [ ChevronToggle ▼ ]
 *   [ fullName  (big) ]
 *   Area    ........  Producción
 *   Rol     ........  Ingeniero
 *   │ (connector)
 *   Obras   ........  Casa Bosque ›
 *   Rol     ........  Visor
 *   │
 *   Obras   ........  Edificio Centro
 *
 * Specs:
 *   • Background      white (#FFFFFF)
 *   • Corner radius   24 px
 *   • Padding         20 px all sides
 *   • Tap target      whole card when collapsed; only the chevron when expanded
 *   • shortName       20 px / semibold, 1 line, ellipsis
 *   • fullName        22 px / bold, up to 2 lines
 *   • ✓ icon          24 px, weight fill, #000 — ONLY when isCompleted === true
 *   • ChevronToggle   60 × 56, halo.white (see ChevronToggle below)
 *
 * Activo ↔ ✓ icon transform is a coordinated crossfade — NOT layoutId
 * (P2_SPEC.md §4.2). The check rotates 90° + scales 0.6 on exit; the pill
 * enters from x: +8 + scale 0.85. Run them simultaneously via popLayout.
 *
 * Name transition: two Text views with simple scale+fade (P2_SPEC.md §4.3).
 * Do NOT reintroduce typewriter logic — it flickers at line-wrap boundaries.
 *
 * Cascade row indices per P2_SPEC.md §4.1:
 *   Area        idx 0  → open 0.06 s, close 0.00 s
 *   Rol 1st     idx 1  → open 0.11 s, close 0.03 s
 *   Connector   idx 2  → open 0.16 s, close 0.06 s
 *   Obras 1st   idx 3  → open 0.21 s, close 0.09 s
 *   Rol 2nd     idx 4  → open 0.26 s, close 0.12 s
 *   Connector   idx 5  → open 0.31 s, close 0.15 s
 *   Obras 2nd   idx 6  → open 0.36 s, close 0.18 s
 */

import { AnimatePresence, motion } from "motion/react";
import { CaretDown, CaretRight, CaretUp, CheckCircle } from "@phosphor-icons/react";
import { springs } from "@/lib/springs";
import { haptic } from "@/lib/haptic";
import { PressableButton, halo } from "@/components/ui/pressable-button";
import { cn } from "@/lib/utils";
import type { User } from "./mock-data";

export interface WorkerCardProps {
  worker: User;
  expanded: boolean;
  onToggle: () => void;
}

export function WorkerCard({ worker, expanded, onToggle }: WorkerCardProps) {
  // Tap on the card surface only expands; collapsing requires the chevron.
  const handleCardTap = () => {
    if (expanded) return;
    haptic.select();
    onToggle();
  };

  return (
    <div
      onClick={handleCardTap}
      style={{
        background: "#FFFFFF",
        borderRadius: 24,
        padding: 20,
        cursor: expanded ? "default" : "pointer",
      }}
    >
      {/* Top row — name|pill on the left, ✓|chevron on the right */}
      <div className="flex items-center gap-3">
        <div className="relative flex min-h-[28px] min-w-0 flex-1 items-center">
          <AnimatePresence initial={false} mode="popLayout">
            {expanded ? (
              <motion.div
                key="activo"
                initial={{ opacity: 0, scale: 0.85, x: 8 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.85, x: 8 }}
                transition={springs.popping}
              >
                <StatusPill status={worker.status} />
              </motion.div>
            ) : (
              <motion.span
                key="short"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={springs.expanding}
                className="block w-full truncate"
                style={{ fontSize: 20, fontWeight: 600, color: "#000" }}
              >
                {worker.shortName}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          {/* Check icon — coordinated exit with the Activo pill, gated by isCompleted */}
          <AnimatePresence initial={false} mode="popLayout">
            {!expanded && worker.isCompleted && (
              <motion.div
                key="check"
                initial={{ opacity: 0, scale: 0.6, rotate: 90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.6, rotate: 90 }}
                transition={springs.expanding}
                className="flex h-7 w-7 items-center justify-center"
                style={{ color: "#000" }}
              >
                <CheckCircle size={24} weight="fill" />
              </motion.div>
            )}
          </AnimatePresence>
          <ChevronToggle
            expanded={expanded}
            onClick={() => {
              haptic.select();
              onToggle();
            }}
          />
        </div>
      </div>

      {/* Expanded body — grid-template-rows for the smooth height transition,
          per DESIGN.md §7.1. Children fade+lift with the cascade delays in §4.1. */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: expanded ? "1fr" : "0fr",
          transition: "grid-template-rows 420ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div style={{ overflow: "hidden", minHeight: 0 }}>
          {/* fullName */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="full"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={springs.expanding}
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#000",
                  lineHeight: 1.15,
                  marginTop: 16,
                }}
              >
                {worker.fullName}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Rows with cascade — each row knows its own index for the delay */}
          <div className="mt-6 flex flex-col gap-3">
            <CascadeRow expanded={expanded} idx={0}>
              <AttributeRow label="Area" value={worker.area} />
            </CascadeRow>

            {worker.assignments.map((a, i) => {
              const baseIdx = 1 + i * 3;
              return (
                <div key={a.id} className="flex flex-col gap-1">
                  <CascadeRow expanded={expanded} idx={baseIdx}>
                    <AttributeRow label="Rol" value={a.role} />
                  </CascadeRow>
                  <CascadeRow expanded={expanded} idx={baseIdx + 1}>
                    <ConnectorLine />
                  </CascadeRow>
                  <CascadeRow expanded={expanded} idx={baseIdx + 2}>
                    <AttributeRow
                      label="Obras"
                      value={a.obras}
                      hasChevron={a.obrasHasChevron}
                    />
                  </CascadeRow>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sub-components — kept in the same file for now; spec §3 lists them as
    separate files if/when they're reused.                                    */
/* -------------------------------------------------------------------------- */

function CascadeRow({
  expanded,
  idx,
  children,
}: {
  expanded: boolean;
  idx: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={false}
      animate={{
        opacity: expanded ? 1 : 0,
        y: expanded ? 0 : 4,
      }}
      transition={{
        duration: expanded ? 0.32 : 0.16,
        ease: "easeOut",
        delay: expanded ? 0.06 + idx * 0.05 : idx * 0.03,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * StatusPill — P2_SPEC.md §3.2.
 *   active   → #000 bg, #FFF text, small ✓ at 11 px leading
 *   inactive → rgba(0,0,0,0.08) bg, #5D636C text, no icon
 *   Text     → 13 px / semibold, tracking 0.4
 *   Padding  → H 10, V 6
 *   Radius   → 999 (full pill)
 */
function StatusPill({ status }: { status: "active" | "inactive" }) {
  const isActive = status === "active";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 6,
        paddingBottom: 6,
        borderRadius: 999,
        background: isActive ? "#000" : "rgba(0,0,0,0.08)",
        color: isActive ? "#FFFFFF" : "#5D636C",
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: 0.4,
        lineHeight: 1,
      }}
    >
      {isActive && <CheckCircle size={11} weight="fill" />}
      {isActive ? "Activo" : "Inactivo"}
    </span>
  );
}

/**
 * AttributeRow — P2_SPEC.md §3.5.
 *   Label   13 px / regular, #5D636C
 *   Value   16 px / semibold, #000
 *   Chevron only when hasChevron is true (14 px, #5D636C)
 */
function AttributeRow({
  label,
  value,
  hasChevron,
}: {
  label: string;
  value: string;
  hasChevron?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 py-1.5">
      <span
        style={{
          fontSize: 13,
          fontWeight: 400,
          color: "#5D636C",
          minWidth: 56,
        }}
      >
        {label}
      </span>
      <div className="flex flex-1 items-center justify-end gap-1.5">
        <span
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: "#000",
          }}
        >
          {value}
        </span>
        {hasChevron && (
          <CaretRight
            size={14}
            weight="bold"
            color="#5D636C"
            style={{ flexShrink: 0 }}
          />
        )}
      </div>
    </div>
  );
}

/**
 * ConnectorLine — P2_SPEC.md §3.6.
 *   Vertical 1 × ~14 hairline, #AAAFB6, sits in the label column.
 */
function ConnectorLine() {
  return (
    <div className="flex" style={{ height: 14 }}>
      <span
        aria-hidden
        style={{
          width: 1,
          height: 14,
          background: "#AAAFB6",
          marginLeft: 4,
        }}
      />
    </div>
  );
}

/**
 * ChevronToggle — P2_SPEC.md §3.4 (.card variant).
 *   60 × 56, corner 14, halo.white.
 *   Collapsed: ▲▼ stacked (chevron up + chevron down).
 *   Expanded:  ▼ only (chevron down).
 */
function ChevronToggle({
  expanded,
  onClick,
}: {
  expanded: boolean;
  onClick: () => void;
}) {
  return (
    <PressableButton
      cornerRadius={14}
      haloColor={halo.white}
      onPressStart={() => haptic.select()}
      onClick={onClick}
      style={{
        width: 60,
        height: 56,
        borderRadius: 14,
        background: "#000",
      }}
      className={cn("text-white")}
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
    </PressableButton>
  );
}
