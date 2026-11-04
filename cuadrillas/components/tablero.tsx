"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCorners,
  pointerWithin,
  useDroppable,
  useSensor,
  useSensors,
  type CollisionDetection,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AnimatePresence, motion } from "motion/react";
import { ArrowCounterClockwise, CaretDown, DotsSixVertical, HardHat, UsersThree } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";
import { springs } from "@/lib/springs";
import { haptic } from "@/lib/haptic";
import {
  COLUMNAS,
  CUADRILLAS,
  POR_ID,
  repetido,
  tableroInicial,
  type ColumnaId,
  type Tablero as TableroT,
} from "@/lib/data";

const STORAGE_KEY = "cuadrillas-tablero-v1";
const IDS_COL = new Set<string>(COLUMNAS.map((c) => c.id));

/** Normaliza lo guardado contra el Excel actual: descarta ids viejos, manda los nuevos a Libre. */
function hidratar(guardado: unknown): TableroT {
  const base = tableroInicial();
  if (!guardado || typeof guardado !== "object") return base;
  const g = guardado as Record<string, unknown>;
  const vistos = new Set<string>();
  const out = { ovet: [], gemelo: [], carreno: [], joel: [], libre: [] } as TableroT;
  for (const col of COLUMNAS) {
    const lista = Array.isArray(g[col.id]) ? (g[col.id] as unknown[]) : [];
    for (const id of lista) {
      if (typeof id === "string" && POR_ID[id] && !vistos.has(id)) {
        out[col.id].push(id);
        vistos.add(id);
      }
    }
  }
  for (const id of base.libre) if (!vistos.has(id)) out.libre.push(id);
  return out;
}

const personas = (ids: string[]) => ids.reduce((n, id) => n + POR_ID[id].miembros.length, 0);

/* Prefer the column under the pointer; fall back to the nearest card corner. */
const colision: CollisionDetection = (args) => {
  const dentro = pointerWithin(args);
  if (dentro.length) {
    const tarjeta = dentro.find((c) => !IDS_COL.has(String(c.id)));
    return tarjeta ? [tarjeta] : dentro;
  }
  return closestCorners(args);
};

export function Tablero() {
  const [tablero, setTablero] = useState<TableroT>(tableroInicial);
  const [listo, setListo] = useState(false);
  const [abiertas, setAbiertas] = useState<Set<string>>(new Set());
  const [activa, setActiva] = useState<string | null>(null);
  const origen = useRef<TableroT | null>(null);

  useEffect(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      if (s) setTablero(hidratar(JSON.parse(s)));
    } catch {
      /* sin almacenamiento: arranca con todo en Libre */
    }
    setListo(true);
  }, []);

  useEffect(() => {
    if (!listo) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tablero));
    } catch {
      /* ignore */
    }
  }, [tablero, listo]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 180, tolerance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const columnaDe = (id: string): ColumnaId | undefined => {
    if (IDS_COL.has(id)) return id as ColumnaId;
    return COLUMNAS.find((c) => tablero[c.id].includes(id))?.id;
  };

  const onDragStart = ({ active }: DragStartEvent) => {
    setActiva(String(active.id));
    origen.current = tablero;
    haptic.select();
  };

  const onDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) return;
    const a = String(active.id);
    const o = String(over.id);
    const de = columnaDe(a);
    const a_ = columnaDe(o);
    if (!de || !a_ || de === a_) return;
    setTablero((t) => {
      const desde = t[de].filter((x) => x !== a);
      const hacia = [...t[a_]];
      const idx = IDS_COL.has(o) ? hacia.length : Math.max(0, hacia.indexOf(o));
      hacia.splice(idx, 0, a);
      return { ...t, [de]: desde, [a_]: hacia };
    });
  };

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    setActiva(null);
    if (!over) {
      if (origen.current) setTablero(origen.current);
      return;
    }
    const a = String(active.id);
    const o = String(over.id);
    const col = columnaDe(a);
    if (col && !IDS_COL.has(o) && tablero[col].includes(o) && a !== o) {
      setTablero((t) => ({ ...t, [col]: arrayMove(t[col], t[col].indexOf(a), t[col].indexOf(o)) }));
    }
    haptic.complete();
  };

  const onDragCancel = () => {
    setActiva(null);
    if (origen.current) setTablero(origen.current);
  };

  const toggle = (id: string) =>
    setAbiertas((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  const asignadas = useMemo(
    () => COLUMNAS.filter((c) => c.id !== "libre").reduce((n, c) => n + tablero[c.id].length, 0),
    [tablero],
  );
  const totalPersonas = useMemo(() => personas(CUADRILLAS.map((c) => c.id)), []);

  const reiniciar = () => {
    setTablero(tableroInicial());
    setAbiertas(new Set());
    haptic.delete();
  };

  return (
    <main className="mx-auto flex min-h-full max-w-[1600px] flex-col gap-6 px-[max(16px,env(safe-area-inset-left,0px))] py-6 md:px-6 md:py-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-body-sm font-semibold uppercase tracking-[0.4px] text-gray-400">
            Ciudad del Valle · Personal de campo
          </span>
          <h1 className="text-heading font-semibold tracking-[0.4px] text-balance">Cuadrillas por maestro</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Resumen etiqueta="Asignadas" valor={`${asignadas}/${CUADRILLAS.length}`} />
          <Resumen etiqueta="Personas" valor={String(totalPersonas)} />
          <button
            type="button"
            onClick={reiniciar}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-body-sm font-semibold text-gray-500 shadow-soft transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <ArrowCounterClockwise size={16} weight="bold" />
            Reiniciar
          </button>
        </div>
      </header>

      <DndContext
        sensors={sensors}
        collisionDetection={colision}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
        onDragCancel={onDragCancel}
      >
        <div className="-mx-4 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
          <div className="grid snap-x snap-mandatory auto-cols-[minmax(272px,85vw)] grid-flow-col gap-4 md:auto-cols-auto md:grid-flow-row md:grid-cols-5">
            {COLUMNAS.map((col) => (
              <Columna
                key={col.id}
                id={col.id}
                nombre={col.nombre}
                ids={tablero[col.id]}
                abiertas={abiertas}
                onToggle={toggle}
              />
            ))}
          </div>
        </div>

        <DragOverlay dropAnimation={{ duration: 180, easing: "cubic-bezier(.2,.8,.2,1)" }}>
          {activa ? <Tarjeta id={activa} abierta={false} flotando /> : null}
        </DragOverlay>
      </DndContext>

      <p className="text-body-sm text-gray-400">
        Arrastrá cada cuadrilla a la columna de su maestro. Tocá el título para ver líder e integrantes. Los cambios se
        guardan en este navegador.
      </p>
    </main>
  );
}

function Resumen({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div className="flex h-10 items-center gap-2 rounded-full bg-white px-4 shadow-soft">
      <span className="text-body-sm text-gray-400">{etiqueta}</span>
      <span className="text-body font-semibold tabular-nums">{valor}</span>
    </div>
  );
}

function Columna({
  id,
  nombre,
  ids,
  abiertas,
  onToggle,
}: {
  id: ColumnaId;
  nombre: string;
  ids: string[];
  abiertas: Set<string>;
  onToggle: (id: string) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id });
  const libre = id === "libre";
  const gente = personas(ids);

  return (
    <section
      aria-label={`Columna ${nombre}`}
      className={cn(
        "flex min-w-0 snap-start flex-col gap-3 rounded-md p-3 transition-[box-shadow,background-color]",
        libre ? "bg-gray-100 border border-dashed border-gray-300" : "bg-white/60 border border-gray-200",
        isOver && "bg-white ring-2 ring-green-100",
      )}
    >
      <header className="flex items-center justify-between gap-2 px-1 pt-1">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={cn(
              "grid size-8 shrink-0 place-items-center rounded-full",
              libre ? "bg-gray-200 text-gray-500" : "bg-black text-green-100",
            )}
          >
            <HardHat size={16} weight="fill" />
          </span>
          <div className="flex min-w-0 flex-col">
            <h2 className="truncate text-subtitle-sm font-semibold tracking-[0.4px]">{nombre}</h2>
            <span className="text-body-sm text-gray-400 tabular-nums">
              {gente} {gente === 1 ? "persona" : "personas"}
            </span>
          </div>
        </div>
        <motion.span
          key={ids.length}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={springs.popping}
          title={`${ids.length} cuadrillas`}
          className={cn(
            "flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-body font-semibold tabular-nums",
            ids.length ? "bg-green-100 text-black" : "bg-gray-200 text-gray-400",
          )}
        >
          {ids.length}
        </motion.span>
      </header>

      <div ref={setNodeRef} className="flex min-h-[120px] flex-1 flex-col gap-2">
        <SortableContext items={ids} strategy={verticalListSortingStrategy}>
          {ids.map((cid) => (
            <TarjetaOrdenable key={cid} id={cid} abierta={abiertas.has(cid)} onToggle={onToggle} />
          ))}
        </SortableContext>
        {ids.length === 0 && (
          <div className="grid flex-1 place-items-center rounded-sm border border-dashed border-gray-300 p-4 text-center text-body-sm text-gray-400">
            Soltá aquí una cuadrilla
          </div>
        )}
      </div>
    </section>
  );
}

function TarjetaOrdenable({ id, abierta, onToggle }: { id: string; abierta: boolean; onToggle: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform), transition }}
      className={cn(isDragging && "opacity-30")}
    >
      <Tarjeta id={id} abierta={abierta} onToggle={onToggle} handle={{ ...attributes, ...listeners }} />
    </div>
  );
}

function Tarjeta({
  id,
  abierta,
  onToggle,
  handle,
  flotando = false,
}: {
  id: string;
  abierta: boolean;
  onToggle?: (id: string) => void;
  handle?: React.HTMLAttributes<HTMLElement>;
  flotando?: boolean;
}) {
  const c = POR_ID[id];
  const n = c.miembros.length;
  const otros = c.miembros.filter((m) => m !== c.lider);

  return (
    <article
      className={cn(
        "overflow-hidden rounded-sm bg-white shadow-card",
        flotando && "rotate-[1.5deg] cursor-grabbing shadow-big ring-2 ring-green-100",
      )}
    >
      <div className="flex items-stretch">
        <span
          {...handle}
          aria-label={`Mover ${c.nombre}`}
          className="grid w-7 shrink-0 cursor-grab touch-none place-items-center text-gray-300 hover:text-gray-500 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-black active:cursor-grabbing"
        >
          <DotsSixVertical size={18} weight="bold" />
        </span>
        <button
          type="button"
          {...(handle && { onPointerDown: handle.onPointerDown, onTouchStart: handle.onTouchStart })}
          onClick={() => onToggle?.(id)}
          aria-expanded={abierta}
          className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 py-3 pr-3 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-black"
        >
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="text-body font-semibold leading-5 break-words">{c.nombre}</span>
            {repetido(c) && (
              <span className="truncate text-body-sm text-gray-400">{c.lider.split(" ").slice(0, 2).join(" ")}</span>
            )}
          </span>
          <span
            className="inline-flex shrink-0 items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-body-sm font-semibold tabular-nums text-gray-500"
            title={`${n} personas`}
          >
            <UsersThree size={14} weight="fill" />
            {n}
          </span>
          <motion.span animate={{ rotate: abierta ? 180 : 0 }} transition={springs.snappy} className="text-gray-400">
            <CaretDown size={16} weight="bold" />
          </motion.span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {abierta && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={springs.expanding}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-3 border-t border-gray-100 px-3 pt-3 pb-3">
              <div className="flex items-center gap-2 rounded-xs bg-black px-3 py-2 text-white">
                <HardHat size={16} weight="fill" className="shrink-0 text-green-100" />
                <div className="flex min-w-0 flex-col">
                  <span className="text-[10px] font-semibold uppercase leading-3 tracking-[0.4px] text-gray-300">
                    Líder de cuadrilla
                  </span>
                  <span className="truncate text-body-sm font-semibold">{c.lider}</span>
                </div>
              </div>
              {otros.length > 0 && (
                <ul className="flex flex-col gap-1">
                  {otros.map((m) => (
                    <li key={m} className="truncate text-body-sm text-gray-500">
                      {m}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
