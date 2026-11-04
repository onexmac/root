"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  type Variants,
} from "motion/react";
import {
  CaretLineDown,
  CaretLineLeft,
  CaretRight,
  Package,
  Plus,
} from "@phosphor-icons/react";
import { SolicitarSlider } from "@/components/pedido/solicitar-slider";
import {
  CARD_SHADOW,
  ItemRow,
  RowHead,
  type LiftStart,
} from "@/components/pedido/item-row";
import { ObraCard } from "@/components/pedido/obra-card";
import { SavingVeil } from "@/components/pedido/saving-veil";
import { springs } from "@/lib/springs";
import { haptic } from "@/lib/haptic";
import { useShake } from "@/lib/use-shake";
import {
  mockObras,
  obraCodigos,
  varilla,
  type Obra,
  type PedidoItem,
} from "@/lib/mock-items";

/**
 * Pale green of the secondary pills (USAR PLANTILLA / AGREGAR OTRA OBRA),
 * matched to the reference. Opaque, same value as ObraCard's saving surface.
 * NOT-IN-DS: no pale-green token — candidate for review.
 */
const PALE_GREEN = "#D3E27F";
import { cn } from "@/lib/cn";

/**
 * PedidoSurface — the Nuevo Pedido right panel, OBRAS redesign.
 *
 * Same two-phase FAB → panel morph shell as `morphing-surface.tsx`. The
 * Bodega tab now groups items into ObraCards (A05 / A06 / …):
 *
 *   · click a row (or its ⋮)      → expand detail (accordion)
 *   · hold 320 ms                 → lift: a fixed-position GHOST follows the
 *                                   pointer; moving over an obra highlights
 *                                   it and live-previews the insertion
 *   · hold + drag across obras    → MOVES the item between obras
 *   · ctrl-hold (⌥ on macOS)      → DUPLICATE-drag: source stays, the ghost
 *                                   carries a DUPLICAR badge, drop inserts
 *                                   a copy at the hovered position
 *   · AGREGAR OTRA OBRA           → appends the next obra (A07, A08, …)
 *
 * The drag is fully hand-rolled (pointer events → ghost transform + state
 * preview). motion's Reorder can't cross groups, and its drag projection
 * fights animated ancestors — both bitten before, see item-row.tsx.
 */

type PedidoTab = "material" | "repuestos" | "bodega";

const TABS: { key: PedidoTab; label: string }[] = [
  { key: "material", label: "Material" },
  { key: "repuestos", label: "Repuestos" },
  { key: "bodega", label: "Bodega" },
];

// Two-phase morph timing — mirrors morphing-surface.tsx exactly.
const morph = springs.morphing;
const PHASE_DELAY = 0.18;
const COLOR_DELAY = 0.22;
const SHARP_CORNERS_DELAY = 0.28;
const CASCADE_START = 0.38;
const STAGGER = 0.06;

// Per-element stagger of the green "sending" cascade, top of the panel down.
const CASCADE_STEP = 0.07;

const surfaceVariants: Variants = {
  closed: {
    width: 80,
    height: 80,
    right: 32,
    top: 32,
    backgroundColor: "#ADD010",
    borderRadius: 32,
    transition: {
      borderRadius: { ...morph },
      backgroundColor: { duration: 0.22 },
      height: { ...morph },
      top: { ...morph },
      width: { delay: PHASE_DELAY, ...morph },
      right: { delay: PHASE_DELAY, ...morph },
    },
  },
  open: {
    width: 670,
    height: "100vh",
    right: 0,
    top: 0,
    backgroundColor: "#ffffff",
    borderRadius: 0,
    transition: {
      width: { ...morph },
      right: { ...morph },
      height: { delay: PHASE_DELAY, ...morph },
      top: { delay: PHASE_DELAY, ...morph },
      backgroundColor: { delay: COLOR_DELAY, duration: 0.22 },
      borderRadius: { delay: SHARP_CORNERS_DELAY, ...morph },
    },
  },
};

const plusVariants: Variants = {
  closed: { opacity: 1, scale: 1, transition: { delay: 0.32, duration: 0.15 } },
  open: { opacity: 0, scale: 0.6, transition: { duration: 0.1 } },
};

const contentVariants: Variants = {
  closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
  open: { transition: { delayChildren: CASCADE_START, staggerChildren: STAGGER } },
};

const itemVariants: Variants = {
  closed: { opacity: 0, y: 12, transition: { duration: 0.15 } },
  open: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 320, damping: 28 } },
};

type DragSession = {
  item: PedidoItem;
  fromObraId: string;
  rect: { x: number; y: number; width: number; height: number };
  startY: number;
  duplicate: boolean;
};

type DropTarget = { obraId: string; index: number };

export function PedidoSurface() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<PedidoTab>("bodega");
  // U08 — the panel opens EMPTY. Boxes appear only via AGREGAR MATERIALES
  // (a fresh unassigned box) or USAR PLANTILLA (loads mockObras wholesale).
  const [obras, setObras] = useState<Obra[]>([]);
  const nextId = useRef(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  // Confirmed state (slider committed, success hold running): content dims
  // and a green success surface covers the obras area, per the reference.
  const [confirming, setConfirming] = useState(false);
  // Manual removal (flag → collapse → filter): AnimatePresence exits never
  // resolved in the previous Reorder tree — nodes stayed mounted forever.
  const [dying, setDying] = useState<string[]>([]);

  // ── Drag session ─────────────────────────────────────────────────────
  const [drag, setDrag] = useState<DragSession | null>(null);
  const dragRef = useRef<DragSession | null>(null);
  const [hoverObraId, setHoverObraId] = useState<string | null>(null);
  const lastTarget = useRef<DropTarget | null>(null);
  const obraEls = useRef(new Map<string, HTMLElement>());
  const ghostY = useMotionValue(0);

  const close = () => {
    // Force-end any live drag first — a ghost must never outlive the panel.
    if (dragRef.current) {
      detachWindow.current?.();
      dragRef.current = null;
      setDrag(null);
      setHoverObraId(null);
      lastTarget.current = null;
    }
    setOpen(false);
    setExpandedId(null);
    setConfirming(false);
    // Closing the panel rewinds the flow to U08 — reopening always starts
    // from the empty state, never from a half-built pedido.
    setObras([]);
    setDying([]);
    setTab("bodega");
    nextId.current = 0;
  };

  // Design-review aid: `?saving=1` opens the panel already parked in the
  // saving state (green surface grown, everything disabled) so the frame can
  // be inspected without racing the 1.4 s hold. Prototype-only.
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("saving") === "1") {
      setOpen(true);
      setConfirming(true);
    }
  }, []);

  // ── U08 → U09 → U10 sequence ─────────────────────────────────────────
  //
  // U08 (empty)  : USAR PLANTILLA + AGREGAR MATERIALES are the only actions.
  // U09 (box)    : materials landed in a box whose obra is UNASSIGNED — its
  //                header shows the green "OBRA +" button. The card's green
  //                square + keeps adding materials to that same box.
  // U10 (assigned): OBRA+ tapped → código chip (A05). Only now does
  //                AGREGAR OTRA OBRA appear, to start the next box.
  //
  // Rule that ties U09 → U10: a new box can't be started while one is still
  // unassigned, which is exactly why U09 has no AGREGAR OTRA OBRA pill.
  const hasPending = obras.some((o) => o.codigo === null);
  // U10 — an obra is assigned, so the footer chevron arms into the slider.
  const armed = obras.length > 0 && !hasPending;
  // U09+ — once the first material exists, USAR PLANTILLA drops to a gray
  // fill (secondary): the primary path is now the box you're building.
  const hasMaterials = obras.length > 0;

  // Refusal signal — increments each time Solicitar is tapped while blocked.
  // A counter, not a flag: motion won't replay an unchanged target, so a
  // boolean would shake once and go dead on the second attempt.
  const [shakeSignal, setShakeSignal] = useState(0);
  const shakeMateriales = useShake(shakeSignal, obras.length === 0);

  const makeItem = () => {
    nextId.current += 1;
    return varilla(`item-${nextId.current}`, true);
  };

  /** U08/U10 → a new box holding one material, obra not yet assigned. */
  const addMaterialsBox = () => {
    haptic.select();
    nextId.current += 1;
    setObras((prev) => [
      ...prev,
      { id: `obra-${nextId.current}`, codigo: null, items: [makeItem()] },
    ]);
  };

  /** U08 — load the saved template (mock A05 + A06) in one shot. */
  const usePlantilla = () => {
    haptic.complete();
    setObras(mockObras.map((o) => ({ ...o, items: [...o.items] })));
  };

  /** U09 → U10 — the OBRA+ button assigns the next free código. */
  const assignObra = (obraId: string) => {
    setObras((prev) => {
      const taken = new Set(prev.map((o) => o.codigo).filter(Boolean));
      const codigo =
        obraCodigos.find((c) => !taken.has(c)) ?? `A${10 + prev.length}`;
      return prev.map((o) => (o.id === obraId ? { ...o, codigo } : o));
    });
  };

  /** Green square + in a card header — another material in THAT box. */
  const addMaterialTo = (obraId: string) => {
    setObras((prev) =>
      prev.map((o) =>
        o.id === obraId ? { ...o, items: [...o.items, makeItem()] } : o,
      ),
    );
  };

  const duplicateInPlace = (obraId: string, item: PedidoItem) => {
    setObras((prev) =>
      prev.map((o) => {
        if (o.id !== obraId) return o;
        const i = o.items.findIndex((p) => p.id === item.id);
        const copy = { ...item, id: `${item.id}-copy-${Date.now()}` };
        return {
          ...o,
          items: [...o.items.slice(0, i + 1), copy, ...o.items.slice(i + 1)],
        };
      }),
    );
  };

  const remove = (id: string) => {
    setDying((d) => (d.includes(id) ? d : [...d, id]));
    setExpandedId((cur) => (cur === id ? null : cur));
    window.setTimeout(() => {
      setObras((prev) =>
        prev.map((o) => ({ ...o, items: o.items.filter((p) => p.id !== id) })),
      );
      setDying((d) => d.filter((x) => x !== id));
    }, 380);
  };

  // ── Drop-target math ─────────────────────────────────────────────────
  // Which obra is under the pointer, and at which row index would the item
  // land? Index counts the rows (excluding the dragged one) whose vertical
  // midpoint is above the pointer.
  const computeTarget = (clientY: number): DropTarget | null => {
    for (const [obraId, el] of obraEls.current) {
      const r = el.getBoundingClientRect();
      if (clientY < r.top - 8 || clientY > r.bottom + 8) continue;
      const rows = [...el.querySelectorAll<HTMLElement>("[data-row-id]")].filter(
        (row) => row.dataset.rowId !== dragRef.current?.item.id,
      );
      let index = 0;
      for (const row of rows) {
        const rr = row.getBoundingClientRect();
        if (rr.top + rr.height / 2 < clientY) index += 1;
      }
      return { obraId, index };
    }
    return null;
  };

  // Move the dragged item to the target position (live preview while
  // dragging in MOVE mode). No-ops when the position is unchanged.
  const previewMove = (t: DropTarget) => {
    const d = dragRef.current;
    if (!d) return;
    setObras((prev) => {
      const from = prev.find((o) => o.items.some((p) => p.id === d.item.id));
      if (!from) return prev;
      if (from.id === t.obraId) {
        // Same obra: t.index was computed excluding the dragged row, so
        // insert into the filtered list. No-op when the order is unchanged.
        const without = from.items.filter((p) => p.id !== d.item.id);
        const items = [
          ...without.slice(0, t.index),
          d.item,
          ...without.slice(t.index),
        ];
        if (items.every((p, i) => p.id === from.items[i]?.id)) return prev;
        return prev.map((o) => (o.id === from.id ? { ...o, items } : o));
      }
      // Cross-obra: pull from the source, insert at the target index.
      return prev.map((o) => {
        if (o.id === from.id)
          return { ...o, items: o.items.filter((p) => p.id !== d.item.id) };
        if (o.id === t.obraId)
          return {
            ...o,
            items: [
              ...o.items.slice(0, t.index),
              d.item,
              ...o.items.slice(t.index),
            ],
          };
        return o;
      });
    });
  };

  // ── Lift lifecycle ───────────────────────────────────────────────────
  // The row hands the gesture off here the moment the hold fires. From then
  // on the pointer is tracked on WINDOW listeners: the live preview can
  // re-parent the dragged row's DOM node (cross-obra), which destroys any
  // pointer capture held by the row — window listeners keep receiving the
  // stream no matter what remounts. (This exact stuck-ghost bug shipped
  // once; do not move tracking back onto the row.)
  const detachWindow = useRef<(() => void) | null>(null);

  const onLiftStart = (s: LiftStart) => {
    const session: DragSession = {
      item: s.item,
      fromObraId: s.obraId,
      rect: s.rect,
      startY: s.clientY,
      duplicate: s.duplicate,
    };
    dragRef.current = session;
    setDrag(session);
    ghostY.set(s.rect.y);
    setHoverObraId(s.obraId);
    lastTarget.current = null;
    // An expanded row collapses when picked up — the ghost shows the head.
    setExpandedId((cur) => (cur === s.item.id ? null : cur));

    const onMove = (e: PointerEvent) => onLiftMove(e.clientX, e.clientY);
    const onUp = () => onLiftEnd();
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    detachWindow.current = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      detachWindow.current = null;
    };
  };

  const onLiftMove = (clientX: number, clientY: number) => {
    const d = dragRef.current;
    if (!d) return;
    ghostY.set(d.rect.y + (clientY - d.startY));
    const t = computeTarget(clientY);
    lastTarget.current = t;
    setHoverObraId(t?.obraId ?? null);
    if (t && !d.duplicate) previewMove(t);
  };

  const onLiftEnd = () => {
    detachWindow.current?.();
    const d = dragRef.current;
    dragRef.current = null;
    if (!d) return;
    const t = lastTarget.current;
    if (d.duplicate && t) {
      const copy = { ...d.item, id: `${d.item.id}-copy-${Date.now()}` };
      setObras((prev) =>
        prev.map((o) =>
          o.id === t.obraId
            ? {
                ...o,
                items: [
                  ...o.items.slice(0, t.index),
                  copy,
                  ...o.items.slice(t.index),
                ],
              }
            : o,
        ),
      );
      haptic.complete();
    } else {
      haptic.select();
    }
    setDrag(null);
    setHoverObraId(null);
    lastTarget.current = null;
  };

  const registerObraEl = (id: string) => (el: HTMLElement | null) => {
    if (el) obraEls.current.set(id, el);
    else obraEls.current.delete(id);
  };

  return (
    <>
      {/* Dim overlay */}
      <AnimatePresence>
        {open && (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={close}
            aria-label="Cerrar"
            className="fixed inset-0 z-20 cursor-default bg-black"
          />
        )}
      </AnimatePresence>

      {/* Single morphing surface — FAB ↔ Nuevo Pedido panel */}
      <motion.div
        initial="closed"
        animate={open ? "open" : "closed"}
        variants={surfaceVariants}
        onClick={() => {
          if (!open) {
            haptic.select();
            setOpen(true);
          }
        }}
        role={open ? "dialog" : "button"}
        aria-label={open ? "Nuevo pedido" : "Crear nuevo pedido"}
        className={cn(
          "fixed z-30 overflow-hidden shadow-big",
          open ? "cursor-default" : "cursor-pointer",
        )}
      >
        {/* Plus icon — visible only when closed */}
        <motion.span
          variants={plusVariants}
          className="absolute inset-0 flex items-center justify-center text-black"
          aria-hidden
        >
          <Plus size={28} weight="bold" />
        </motion.span>

        {/* Panel content — cascades in after the surface morph */}
        <motion.div
          variants={contentVariants}
          className="absolute inset-0 flex flex-col"
          style={{ pointerEvents: open ? "auto" : "none" }}
        >
          {/* Scroll region — EVERYTHING except the footer scrolls together
              (header, tabs, obras). The footer is the only pinned element.
              While confirming, the whole region is inert (disabled). */}
          <div
            className={cn(
              "flex-1 overflow-y-auto",
              confirming && "pointer-events-none",
            )}
          >
          {/* Header. The dim-while-saving class lives on an INNER div: the
              outer motion.div's opacity is owned by the cascade variants
              (inline style), which would override a Tailwind opacity class. */}
          <motion.div variants={itemVariants} className="px-8 pt-8">
          <div className="relative flex items-center justify-between">
            <SavingVeil active={confirming} delay={0} radius={16} />
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                <Package size={24} weight="regular" />
              </div>
              <h2 className="text-[22px] font-semibold tracking-[0.2px]">
                Nuevo Pedido
              </h2>
            </div>
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              transition={springs.snappy}
              onClick={close}
              aria-label="Cerrar"
              className="flex h-9 w-9 items-center justify-center rounded-[8px] text-gray-400 hover:bg-gray-100"
            >
              <CaretLineDown size={20} weight="bold" />
            </motion.button>
          </div>
          </motion.div>

          {/* Tabs — 3-segment control, sliding black pill */}
          <motion.div variants={itemVariants} className="mt-6 px-8">
            <div className="relative grid grid-cols-3 rounded-[24px] bg-white p-1 ring-1 ring-gray-200">
              <SavingVeil active={confirming} delay={CASCADE_STEP} radius={24} />
              {TABS.map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    haptic.select();
                    setTab(key);
                  }}
                  className="relative h-11 rounded-[20px] text-[14px] font-medium"
                >
                  {tab === key ? (
                    <motion.span
                      layoutId="pedido-tab-pill"
                      transition={springs.morphing}
                      className="absolute inset-0 rounded-[20px] bg-black"
                    />
                  ) : null}
                  <span
                    className={cn(
                      "relative z-10 transition-colors duration-150",
                      tab === key ? "font-semibold text-white" : "text-black",
                    )}
                  >
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Body — plain block inside the shared scroll region. */}
          <motion.div
            variants={itemVariants}
            className="px-6 py-6"
          >
            {/* popLayout, not mode="wait": waiting for a full exit before the
                enter left the panel visibly empty for a beat. Overlapping the
                two lets them cross-fade, and the exit is quicker than the enter
                so the incoming tab always leads. */}
            <AnimatePresence mode="popLayout" initial={false}>
              {tab === "bodega" ? (
                <motion.section
                  key="bodega"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6, transition: { duration: 0.12, ease: "easeIn" } }}
                  transition={{ ...springs.settling, opacity: { duration: 0.22, ease: "easeOut" } }}
                  className="flex flex-col gap-6"
                >
                  {/* No OBRAS heading: it popped in the moment the first
                      material landed, and the reference doesn't have one. */}

                  {/* USAR PLANTILLA — present in U08, U09 AND U10: loading a
                      saved template stays available while building. */}
                  <motion.button
                    type="button"
                    layout
                    whileTap={confirming ? undefined : { scale: 0.98 }}
                    transition={springs.snappy}
                    onClick={usePlantilla}
                    disabled={confirming}
                    // Fill only: pale green while it's the primary empty-state
                    // action, gray-100 + green ring once materials exist.
                    animate={{
                      backgroundColor: hasMaterials ? "#ebebeb" : PALE_GREEN,
                      boxShadow: hasMaterials
                        ? "0 0 0 1.5px #ADD010"
                        : "0 0 0 1.5px rgba(173,208,16,0)",
                    }}
                    className={cn(
                      "relative flex h-[52px] items-center justify-between rounded-[20px] px-8 text-[14px] font-semibold tracking-[0.4px] text-black",
                      confirming && "pointer-events-none",
                    )}
                  >
                    <SavingVeil active={confirming} delay={CASCADE_STEP * 2} radius={20} />
                    USAR PLANTILLA
                    <Plus size={22} weight="bold" />
                  </motion.button>

                  {/* U08 — empty: AGREGAR MATERIALES is the primary action
                      (solid green). It disappears once a box exists, because
                      from U09 on materials are added via the card's own +. */}
                  {obras.length === 0 ? (
                    // Shake wrapper — this is the missing step while empty, so
                    // a blocked Solicitar tap shakes it. Separate element from
                    // the button so it doesn't fight whileTap's transform.
                    <motion.div animate={shakeMateriales} className="flex">
                      <motion.button
                        type="button"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileTap={{ scale: 0.98 }}
                        transition={springs.morphing}
                        onClick={addMaterialsBox}
                        className="flex h-[52px] flex-1 items-center justify-between rounded-[20px] bg-green-100 px-8 text-[14px] font-semibold tracking-[0.4px] text-black"
                      >
                        AGREGAR MATERIALES
                        <Plus size={22} weight="bold" />
                      </motion.button>
                    </motion.div>
                  ) : null}

                  {/* Materials — each obra card grows its own green "saving"
                      surface (see ObraCard). The cards themselves are NOT
                      dimmed: the green covers them, and per the reference the
                      rows still below the fill read at full contrast. */}
                  <div className="flex flex-col gap-8">
                    {obras.map((obra, i) => (
                      <ObraCard
                        key={obra.id}
                        obra={obra}
                        isDropTarget={!!drag && hoverObraId === obra.id}
                        saving={confirming}
                        shakeSignal={shakeSignal}
                        savingDelay={CASCADE_STEP * (3 + i)}
                        onAssign={() => assignObra(obra.id)}
                        onAddMaterial={() => addMaterialTo(obra.id)}
                        containerRef={registerObraEl(obra.id)}
                      >
                        {obra.items.map((item, i) => (
                          <ItemRow
                            key={item.id}
                            item={item}
                            obraId={obra.id}
                            expanded={expandedId === item.id}
                            dying={dying.includes(item.id)}
                            ghosted={
                              !!drag && !drag.duplicate && drag.item.id === item.id
                            }
                            showDivider={i < obra.items.length - 1}
                            onToggle={() =>
                              setExpandedId((cur) =>
                                cur === item.id ? null : item.id,
                              )
                            }
                            onDuplicate={() => duplicateInPlace(obra.id, item)}
                            onDelete={() => remove(item.id)}
                            onLiftStart={onLiftStart}
                          />
                        ))}
                      </ObraCard>
                    ))}

                  </div>

                  {/* AGREGAR OTRA OBRA — visible only once every box has a
                      código (that's why U09 hides it): name the current obra
                      before starting the next. Outside the cards so their
                      saving surfaces don't eat it.

                      OPACITY ONLY — no mount/unmount, no layout animation.
                      Three earlier attempts each flickered for their own
                      reason: an instant unmount blinked the node away; a
                      spring on `height`+`marginTop` overshot and wobbled;
                      AnimatePresence re-played the entrance on every remount.
                      So the node now simply STAYS, keeps its 52 px of space
                      whenever any box exists, and fades. Reserving that space
                      while a box is pending costs nothing — the reference
                      leaves that area empty at this step anyway — and nothing
                      about it can flicker: no remount, no layout, one property. */}
                  {obras.length > 0 ? (
                    <motion.button
                      type="button"
                      initial={false}
                      // NOT faded while confirming — it must stay visible so its
                      // own SavingVeil can cover it as part of the cascade; a
                      // parent opacity of 0 would take the veil down with it.
                      animate={{ opacity: hasPending ? 0 : 1 }}
                      transition={{ duration: 0.24, ease: "easeOut" }}
                      whileTap={
                        confirming || hasPending ? undefined : { scale: 0.97 }
                      }
                      onClick={addMaterialsBox}
                      disabled={confirming || hasPending}
                      className={cn(
                        "relative flex h-[52px] shrink-0 items-center justify-between rounded-[20px] px-8 text-[14px] font-semibold tracking-[0.4px] text-black",
                        (confirming || hasPending) && "pointer-events-none",
                      )}
                      style={{ background: PALE_GREEN }}
                    >
                      <SavingVeil
                        active={confirming}
                        delay={CASCADE_STEP * (3 + obras.length)}
                        radius={20}
                      />
                      AGREGAR OTRA OBRA
                      <Plus size={22} weight="bold" />
                    </motion.button>
                  ) : null}
                </motion.section>
              ) : (
                <motion.section
                  key={tab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6, transition: { duration: 0.12, ease: "easeIn" } }}
                  transition={{ ...springs.settling, opacity: { duration: 0.22, ease: "easeOut" } }}
                  className="px-2 pt-2 text-body text-gray-300"
                >
                  {/* Reference screens only define the Bodega tab. */}
                  —
                </motion.section>
              )}
            </AnimatePresence>
          </motion.div>

          </div>
          {/* Footer — PINNED below the scroll region: hairline, CANCELAR
              (regresar) at the left, Solicitar slide-to-confirm at the
              right. Everything above scrolls; this never moves. */}
          <motion.div variants={itemVariants} className="shrink-0 px-6 pb-6">
            <div className="mb-5 h-px bg-gray-200" />
            <div className="flex items-center justify-between">
              <motion.button
                type="button"
                whileTap={confirming ? undefined : { scale: 0.96 }}
                transition={springs.snappy}
                onClick={close}
                disabled={confirming}
                className={cn(
                  "flex h-[52px] items-center gap-3 rounded-[16px] bg-white px-6 text-[14px] font-semibold tracking-[0.4px] text-black ring-1 ring-gray-200 transition-opacity duration-300",
                  confirming && "pointer-events-none opacity-40",
                )}
              >
                <CaretLineLeft size={18} weight="bold" />
                CANCELAR
              </motion.button>
              {/* ONE control that morphs: collapsed chevron button while no
                  obra is assigned (U08/U09), growing into the full Solicitar
                  slider once one is (U10) — the mobile SlideArm pattern.
                  Collapsed taps advance the flow. */}
              <div className="w-[275px]">
                <SolicitarSlider
                  label="Solicitar"
                  armed={armed}
                  // Long enough for the green "saving" surface to visibly
                  // grow over the materials before the panel closes.
                  successHoldMs={1400}
                  onAdvance={() => {
                    // Chevron = next step: create the first box, or name the
                    // box that's still pending.
                    const pending = obras.find((o) => o.codigo === null);
                    if (!obras.length) addMaterialsBox();
                    else if (pending) assignObra(pending.id);
                  }}
                  onBlocked={() => setShakeSignal((n) => n + 1)}
                  onCommitStart={() => setConfirming(true)}
                  onConfirm={close}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Drag ghost — fixed, follows the pointer via ghostY. Lives OUTSIDE
          the obra cards so it can fly across them. pointer-events-none so
          hit-testing sees the obras underneath. */}
      <AnimatePresence>
        {drag && open ? (
          <motion.div
            key="drag-ghost"
            className="pointer-events-none fixed z-[70]"
            style={{
              left: drag.rect.x,
              top: 0,
              width: drag.rect.width,
              y: ghostY,
            }}
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 1.03 }}
            exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.16 } }}
            transition={{ type: "spring", stiffness: 385, damping: 22, mass: 1 }}
          >
            <div
              className="rounded-2xl bg-white"
              style={{ boxShadow: CARD_SHADOW }}
            >
              <RowHead item={drag.item} />
            </div>
            {drag.duplicate ? (
              <motion.span
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={springs.popping}
                className="absolute -top-2 right-4 rounded-[8px] bg-green-100 px-3 py-1 text-[11px] font-bold tracking-[0.4px] text-black shadow-soft"
              >
                + DUPLICAR
              </motion.span>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
