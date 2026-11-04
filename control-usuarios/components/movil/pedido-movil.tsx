"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BottomBar } from "@/components/movil/bottom-bar";
import { NuevoPedidoSheetMovil } from "@/components/movil/nuevo-pedido-sheet-movil";
import { springs } from "@/lib/springs";
import { haptic } from "@/lib/haptic";
import { cn } from "@/lib/cn";
import { mockPedidos, type Pedido } from "@/lib/mock-items";

/**
 * PedidoMovil — PEDIDOS on a phone, bottom-first. The list scrolls under the
 * title; the estado filter and the morphing FAB own the thumb zone.
 *
 * Rendered by /pedido below the desktop breakpoint (see useIsCompact).
 */

type PedidoFilter = "todos" | "borrador" | "enviados";

const FILTERS: { key: PedidoFilter; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "borrador", label: "Borrador" },
  { key: "enviados", label: "Enviados" },
];

const ESTADO_STYLE: Record<Pedido["estado"], string> = {
  borrador: "bg-gray-100 text-gray-500",
  enviado: "bg-black text-white",
  recibido: "bg-green-100 text-black",
};

const ESTADO_LABEL: Record<Pedido["estado"], string> = {
  borrador: "Borrador",
  enviado: "Enviado",
  recibido: "Recibido",
};

export function PedidoMovil() {
  const [pedidos, setPedidos] = useState<Pedido[]>(mockPedidos);
  const [filter, setFilter] = useState<PedidoFilter>("todos");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [justAdded, setJustAdded] = useState<string | null>(null);

  const visible = useMemo(() => {
    if (filter === "todos") return pedidos;
    if (filter === "borrador")
      return pedidos.filter((p) => p.estado === "borrador");
    return pedidos.filter((p) => p.estado !== "borrador");
  }, [pedidos, filter]);

  const addPedido = (obra: string) => {
    const n = 149 + pedidos.length - mockPedidos.length;
    const id = `p-new-${n}`;
    setPedidos((prev) => [
      {
        id,
        folio: `PD-0${n}`,
        obra,
        proyecto: "Valle Novarum",
        lineas: 1,
        estado: "enviado",
        fecha: "Hoy",
      },
      ...prev,
    ]);
    setFilter("todos");
    setJustAdded(id);
    haptic.complete();
    window.setTimeout(() => setJustAdded(null), 1600);
  };

  return (
    <main
      className="relative mx-auto min-h-[100dvh] w-full max-w-[402px] bg-background"
      style={{ overscrollBehaviorY: "none" }}
    >
      <div className="px-4 pb-[200px] pt-8">
        <header className="px-1 pb-5">
          <h1 className="text-[28px] font-semibold tracking-[0.4px] text-black">
            PEDIDOS
          </h1>
        </header>

        <motion.div layout className="flex flex-col gap-3">
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  scale: 0.97,
                  transition: { duration: 0.14 },
                }}
                transition={springs.morphing}
                className="relative"
              >
                <motion.article
                  whileTap={{ scale: 0.985 }}
                  transition={springs.popping}
                  onClick={() => haptic.select()}
                  className="cursor-pointer rounded-[24px] bg-white p-5 shadow-card"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[18px] font-semibold text-black">
                      {p.folio}
                    </span>
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-[12px] font-semibold",
                        ESTADO_STYLE[p.estado],
                      )}
                    >
                      {ESTADO_LABEL[p.estado]}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="flex h-8 items-center rounded-[8px] px-3 text-[14px] font-medium text-black ring-1 ring-gray-200">
                      {p.obra}
                    </span>
                    <span className="truncate text-[14px] text-gray-400">
                      {p.proyecto}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-[13px] text-gray-400">
                    <span className="font-medium text-black">
                      {p.lineas} {p.lineas === 1 ? "línea" : "líneas"}
                    </span>
                    <span className="text-gray-200">·</span>
                    <span>{p.fecha}</span>
                  </div>
                </motion.article>

                <motion.span
                  aria-hidden
                  initial={false}
                  animate={{ opacity: justAdded === p.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="pointer-events-none absolute inset-0 rounded-[24px]"
                  style={{ boxShadow: "0 0 0 2px #ADD010" }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 ? (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springs.expanding}
            className="px-1 pt-6 text-[15px] text-gray-400"
          >
            No hay pedidos en {filter === "borrador" ? "borrador" : "enviados"}.
          </motion.p>
        ) : null}
      </div>

      <BottomBar<PedidoFilter>
        value={filter}
        onChange={setFilter}
        options={FILTERS}
        noun={["pedido", "pedidos"]}
        pillId="movil-pedido-filter-pill"
        hidden={sheetOpen}
        count={visible.length}
      />

      <NuevoPedidoSheetMovil
        open={sheetOpen}
        onOpen={() => setSheetOpen(true)}
        onDismiss={() => setSheetOpen(false)}
        onCreated={addPedido}
      />
    </main>
  );
}
