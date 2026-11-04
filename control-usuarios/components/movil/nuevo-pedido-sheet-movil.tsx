"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate as animateValue,
  motion,
  useMotionValue,
} from "motion/react";
import { CaretLineDown, Package, Plus } from "@phosphor-icons/react";
import { SolicitarSlider } from "@/components/pedido/solicitar-slider";
import { SavingVeil } from "@/components/pedido/saving-veil";
import { MaterialRowMovil } from "@/components/movil/material-row-movil";
import { ObraBoxMovil } from "@/components/movil/obra-box-movil";
import { springs } from "@/lib/springs";
import { haptic } from "@/lib/haptic";
import { useShake } from "@/lib/use-shake";
import { cn } from "@/lib/cn";
import {
  mockObras,
  obraCodigos,
  varilla,
  type Obra,
  type PedidoItem,
} from "@/lib/mock-items";

/**
 * NuevoPedidoSheetMovil — the obra → materiales flow as a bottom sheet.
 *
 * Carries the desktop panel's staged rules verbatim:
 *   empty      USAR PLANTILLA + AGREGAR MATERIALES are the only actions
 *   box        materials land in a box whose obra is UNASSIGNED (green OBRA+)
 *   assigned   OBRA+ becomes the código chip, and only then can you start
 *              another box — which is why AGREGAR OTRA OBRA is hidden until now
 *
 * The morph shell (FAB → sheet, handle drag, pinned header/footer) mirrors the
 * usuarios mobile sheet. Both should collapse into ONE DS bottom-sheet
 * component when this graduates to Temp Losa Flotante; kept separate here so
 * the approved usuarios screen stays untouched.
 */

const FAB_W = 84;
const FAB_H = 80;
const FAB_INSET = 24;
const FAB_RADIUS = 24;
const SHEET_RADIUS = 32;

// Literals — motion cannot interpolate var() colors (#1).
const GREEN = "#ADD010";
const WHITE = "#ffffff";
const PALE_GREEN = "#D3E27F";

const RUBBER_KNEE = 240;
const STEP_OFFSET = 100;
const STEP_PREDICTED = 250;
const PHASE_DELAY = 0.18;
const CORNER_DELAY = 0.26;
const CASCADE_STEP = 0.07;

type Tab = "material" | "repuestos" | "bodega";
const TABS: { key: Tab; label: string }[] = [
  { key: "material", label: "Material" },
  { key: "repuestos", label: "Repuestos" },
  { key: "bodega", label: "Bodega" },
];

export function NuevoPedidoSheetMovil({
  open,
  onOpen,
  onDismiss,
  onCreated,
}: {
  open: boolean;
  onOpen: () => void;
  onDismiss: () => void;
  onCreated: (obra: string) => void;
}) {
  const [tab, setTab] = useState<Tab>("bodega");
  const [obras, setObras] = useState<Obra[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [dying, setDying] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const nextId = useRef(0);

  const [vh, setVh] = useState(0);
  useEffect(() => {
    const update = () => setVh(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  // Taller than the usuarios sheet: a pedido is a list, so it earns the room.
  const sheetH = vh > 0 ? Math.max(vh - 120, 360) : 620;

  const hasPending = obras.some((o) => o.codigo === null);
  const armed = obras.length > 0 && !hasPending && !saving;
  const hasMaterials = obras.length > 0;

  const [shakeSignal, setShakeSignal] = useState(0);
  const shakeMateriales = useShake(shakeSignal, obras.length === 0);

  const makeItem = () => {
    nextId.current += 1;
    return varilla(`m-${nextId.current}`, nextId.current % 2 === 1);
  };

  const addMaterialsBox = () => {
    haptic.select();
    nextId.current += 1;
    setObras((prev) => [
      ...prev,
      { id: `obra-${nextId.current}`, codigo: null, items: [makeItem()] },
    ]);
  };

  const usePlantilla = () => {
    haptic.complete();
    setObras(mockObras.map((o) => ({ ...o, items: [...o.items] })));
  };

  const assignObra = (id: string) =>
    setObras((prev) => {
      const taken = new Set(prev.map((o) => o.codigo).filter(Boolean));
      const codigo =
        obraCodigos.find((c) => !taken.has(c)) ?? `A${10 + prev.length}`;
      return prev.map((o) => (o.id === id ? { ...o, codigo } : o));
    });

  const addMaterialTo = (id: string) =>
    setObras((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, items: [...o.items, makeItem()] } : o,
      ),
    );

  const duplicate = (obraId: string, item: PedidoItem) =>
    setObras((prev) =>
      prev.map((o) => {
        if (o.id !== obraId) return o;
        const i = o.items.findIndex((p) => p.id === item.id);
        nextId.current += 1;
        const copy = { ...item, id: `${item.id}-c${nextId.current}` };
        return {
          ...o,
          items: [...o.items.slice(0, i + 1), copy, ...o.items.slice(i + 1)],
        };
      }),
    );

  // Manual removal: flag → animate → filter. AnimatePresence exits have a
  // history of never resolving in these nested lists (#6).
  const remove = (id: string) => {
    setDying((d) => (d.includes(id) ? d : [...d, id]));
    setExpandedId((cur) => (cur === id ? null : cur));
    window.setTimeout(() => {
      setObras((prev) =>
        prev.map((o) => ({ ...o, items: o.items.filter((i) => i.id !== id) })),
      );
      setDying((d) => d.filter((x) => x !== id));
    }, 380);
  };

  const reset = () => {
    setObras([]);
    setDying([]);
    setExpandedId(null);
    setTab("bodega");
    setSaving(false);
    nextId.current = 0;
  };

  const close = () => {
    onDismiss();
    reset();
  };

  // ── Drag-to-dismiss on the handle (safe to capture: never re-parents) ──
  const dragY = useMotionValue(0);
  const drag = useRef<{
    startY: number;
    lastY: number;
    lastT: number;
    vy: number;
    moved: boolean;
  } | null>(null);

  const onDown = (e: React.PointerEvent) => {
    if (!open || saving) return;
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
    drag.current = {
      startY: e.clientY,
      lastY: e.clientY,
      lastT: e.timeStamp,
      vy: 0,
      moved: false,
    };
    haptic.drag();
  };

  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const raw = Math.max(0, e.clientY - d.startY);
    dragY.set(raw < RUBBER_KNEE ? raw : RUBBER_KNEE + (raw - RUBBER_KNEE) * 0.35);
    if (Math.abs(e.clientY - d.startY) > 8) d.moved = true;
    const dt = e.timeStamp - d.lastT;
    if (dt > 0) d.vy = (e.clientY - d.lastY) / dt;
    d.lastY = e.clientY;
    d.lastT = e.timeStamp;
  };

  const onUp = () => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    if (!d.moved) {
      animateValue(dragY, 0, springs.snappy);
      close();
      return;
    }
    const t = dragY.get();
    if (t > STEP_OFFSET || t + d.vy * 100 > STEP_PREDICTED) {
      haptic.select();
      animateValue(dragY, 0, springs.settling);
      close();
    } else {
      animateValue(dragY, 0, springs.snappy);
    }
  };

  useEffect(() => {
    if (!open) dragY.set(0);
  }, [open, dragY]);

  const surfaceTarget = open
    ? {
        width: "100%",
        height: sheetH,
        right: 0,
        bottom: 0,
        backgroundColor: WHITE,
        borderRadius: SHEET_RADIUS,
      }
    : {
        width: FAB_W,
        height: FAB_H,
        right: FAB_INSET,
        bottom: FAB_INSET,
        backgroundColor: GREEN,
        borderRadius: FAB_RADIUS,
      };

  const surfaceTransition = open
    ? {
        width: springs.morphing,
        right: springs.morphing,
        height: { ...springs.morphing, delay: PHASE_DELAY },
        bottom: { ...springs.morphing, delay: PHASE_DELAY },
        backgroundColor: { duration: 0.22, delay: 0.1 },
        borderRadius: { ...springs.morphing, delay: CORNER_DELAY },
      }
    : {
        height: springs.shrinking,
        bottom: springs.shrinking,
        width: { ...springs.shrinking, delay: 0.12 },
        right: { ...springs.shrinking, delay: 0.12 },
        backgroundColor: { duration: 0.22 },
        borderRadius: springs.shrinking,
      };

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.button
            key="scrim"
            type="button"
            aria-label="Cerrar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={close}
            className="fixed inset-0 z-40 cursor-default border-0 bg-black p-0"
          />
        ) : null}
      </AnimatePresence>

      <div className="pointer-events-none fixed inset-0 z-50 mx-auto max-w-[402px]">
        <motion.div
          initial={false}
          animate={surfaceTarget}
          transition={surfaceTransition}
          onClick={() => {
            if (!open) {
              haptic.select();
              onOpen();
            }
          }}
          role={open ? "dialog" : "button"}
          aria-label={open ? "Nuevo pedido" : "Crear pedido"}
          style={{
            position: "absolute",
            overflow: "hidden",
            y: dragY,
            boxShadow: "0 2px 4px rgba(0,0,0,0.16), 0 0 6px rgba(0,0,0,0.16)",
            cursor: open ? "default" : "pointer",
          }}
          className="pointer-events-auto flex flex-col"
        >
          <motion.span
            aria-hidden
            initial={false}
            animate={{ opacity: open ? 0 : 1, scale: open ? 0.6 : 1 }}
            transition={{ duration: open ? 0.1 : 0.15, delay: open ? 0 : 0.28 }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center text-black"
          >
            <Plus size={28} weight="bold" />
          </motion.span>

          <motion.div
            initial={false}
            animate={{ opacity: open ? 1 : 0 }}
            transition={{ duration: 0.2, delay: open ? 0.24 : 0 }}
            className={cn(
              "flex h-full flex-col",
              open ? "pointer-events-auto" : "pointer-events-none",
            )}
          >
            <div
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
              role="button"
              aria-label="Cerrar"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  close();
                }
              }}
              style={{ touchAction: "none", cursor: "grab" }}
              className="flex shrink-0 items-center justify-center pb-1 pt-3"
            >
              <span className="flex h-7 w-14 items-center justify-center rounded-[8px] text-gray-300">
                <CaretLineDown size={20} weight="bold" />
              </span>
            </div>

            <div className="relative flex shrink-0 items-center gap-3 px-5 pb-4">
              <SavingVeil active={saving} delay={0} radius={16} />
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                <Package size={22} weight="regular" />
              </span>
              <h2 className="text-[20px] font-semibold tracking-[0.2px]">
                Nuevo pedido
              </h2>
            </div>

            {/* Main filter — sliding pill, and the content below cross-fades
                (popLayout) instead of emptying out between tabs. */}
            <div className="shrink-0 px-5 pb-4">
              <div className="relative grid grid-cols-3 rounded-[24px] bg-white p-1 ring-1 ring-gray-200">
                <SavingVeil active={saving} delay={CASCADE_STEP} radius={24} />
                {TABS.map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => {
                      haptic.select();
                      setTab(t.key);
                    }}
                    className="relative h-10 rounded-[20px] text-[13px] font-medium"
                  >
                    {tab === t.key ? (
                      <motion.span
                        layoutId="movil-pedido-tab-pill"
                        transition={springs.morphing}
                        className="absolute inset-0 rounded-[20px] bg-black"
                      />
                    ) : null}
                    <span
                      className={cn(
                        "relative z-10 transition-colors duration-150",
                        tab === t.key
                          ? "font-semibold text-white"
                          : "text-black",
                      )}
                    >
                      {t.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-2">
              <AnimatePresence mode="popLayout" initial={false}>
                {tab === "bodega" ? (
                  <motion.div
                    key="bodega"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      y: -6,
                      transition: { duration: 0.12, ease: "easeIn" },
                    }}
                    transition={{
                      ...springs.settling,
                      opacity: { duration: 0.22, ease: "easeOut" },
                    }}
                    className="flex flex-col gap-5"
                  >
                    <motion.button
                      type="button"
                      initial={false}
                      animate={{
                        backgroundColor: hasMaterials ? "#ebebeb" : PALE_GREEN,
                        boxShadow: hasMaterials
                          ? "0 0 0 1.5px #ADD010"
                          : "0 0 0 1.5px rgba(173,208,16,0)",
                      }}
                      whileTap={saving ? undefined : { scale: 0.98 }}
                      transition={springs.morphing}
                      onClick={usePlantilla}
                      disabled={saving}
                      className="relative flex h-12 items-center justify-between rounded-[20px] px-6 text-[13px] font-semibold tracking-[0.4px] text-black"
                    >
                      <SavingVeil
                        active={saving}
                        delay={CASCADE_STEP * 2}
                        radius={20}
                      />
                      USAR PLANTILLA
                      <Plus size={20} weight="bold" />
                    </motion.button>

                    {obras.length === 0 ? (
                      <motion.div animate={shakeMateriales} className="flex">
                        <motion.button
                          type="button"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          whileTap={{ scale: 0.98 }}
                          transition={springs.morphing}
                          onClick={addMaterialsBox}
                          className="flex h-12 flex-1 items-center justify-between rounded-[20px] bg-green-100 px-6 text-[13px] font-semibold tracking-[0.4px] text-black"
                        >
                          AGREGAR MATERIALES
                          <Plus size={20} weight="bold" />
                        </motion.button>
                      </motion.div>
                    ) : null}

                    <div className="flex flex-col gap-5">
                      {obras.map((obra, i) => (
                        <ObraBoxMovil
                          key={obra.id}
                          obra={obra}
                          saving={saving}
                          savingDelay={CASCADE_STEP * (3 + i)}
                          shakeSignal={shakeSignal}
                          onAssign={() => assignObra(obra.id)}
                          onAddMaterial={() => addMaterialTo(obra.id)}
                        >
                          {obra.items.map((item, idx) => (
                            <MaterialRowMovil
                              key={item.id}
                              item={item}
                              expanded={expandedId === item.id}
                              dying={dying.includes(item.id)}
                              showDivider={idx < obra.items.length - 1}
                              onToggle={() =>
                                setExpandedId((cur) =>
                                  cur === item.id ? null : item.id,
                                )
                              }
                              onDuplicate={() => duplicate(obra.id, item)}
                              onDelete={() => remove(item.id)}
                            />
                          ))}
                        </ObraBoxMovil>
                      ))}
                    </div>

                    {/* Opacity only, always mounted — see MOTION_GOTCHAS #15:
                        remounting or animating layout here flickered. */}
                    {obras.length > 0 ? (
                      <motion.button
                        type="button"
                        initial={false}
                        animate={{ opacity: hasPending ? 0 : 1 }}
                        transition={{ duration: 0.24, ease: "easeOut" }}
                        whileTap={
                          saving || hasPending ? undefined : { scale: 0.98 }
                        }
                        onClick={addMaterialsBox}
                        disabled={saving || hasPending}
                        className={cn(
                          "relative flex h-12 shrink-0 items-center justify-between rounded-[20px] px-6 text-[13px] font-semibold tracking-[0.4px] text-black",
                          (saving || hasPending) && "pointer-events-none",
                        )}
                        style={{ background: PALE_GREEN }}
                      >
                        <SavingVeil
                          active={saving}
                          delay={CASCADE_STEP * (3 + obras.length)}
                          radius={20}
                        />
                        AGREGAR OTRA OBRA
                        <Plus size={20} weight="bold" />
                      </motion.button>
                    ) : null}
                  </motion.div>
                ) : (
                  <motion.div
                    key={tab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      y: -6,
                      transition: { duration: 0.12, ease: "easeIn" },
                    }}
                    transition={{
                      ...springs.settling,
                      opacity: { duration: 0.22, ease: "easeOut" },
                    }}
                    className="pt-2 text-[15px] text-gray-300"
                  >
                    Sin líneas en {tab === "material" ? "Material" : "Repuestos"}.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div
              className="shrink-0 px-5 pt-3"
              style={{
                paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 20px)",
              }}
            >
              <div className="mb-4 h-px bg-gray-200" />
              <SolicitarSlider
                label="Solicitar"
                armed={armed}
                expandedWidth={330}
                successHoldMs={1400}
                onBlocked={() => {
                  setTab("bodega");
                  setShakeSignal((n) => n + 1);
                }}
                onCommitStart={() => setSaving(true)}
                onConfirm={() => {
                  const first = obras.find((o) => o.codigo)?.codigo ?? "A05";
                  onCreated(first);
                  close();
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
