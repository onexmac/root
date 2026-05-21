import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "../../buttons/Button";
import { Icon } from "../../iconos/Icon";
import { ToggleCards } from "../../ToggleCards/ToggleCards";
import { springs } from "../../springs";
import { haptic } from "../../haptic";


/**
 * BoletaPedido — stack de boletas con flujo de pedido.
 * Estados (mode):
 *   slab     → vista por defecto, top card expandida con items + qty
 *   confirm  → ajuste de cantidades antes de confirmar pedido
 *   menu     → selector de destino (PEDIDOS / ENTREGADO / TRASLADO)
 *   closed   → top card colapsada (sin contenido expandido)
 */

type Mode = "slab" | "confirm" | "menu" | "closed";

interface Item {
  id: string;
  name: string;
  qty: number;
  newQty: number;
}

interface Boleta {
  id: string;
  code: string;
  number: string;
  date: string;
  batch: string;
}

const ITEMS: Item[] = [
  { id: "1", name: "CONECTOR ADAPTADOR HEMBRA EAGLE 110V SALIDA MACHO EAGLE 220V", qty: 10, newQty: 20 },
  { id: "2", name: "CONECTOR ADAPTADOR HEMBRA EAGLE 110V SALIDA MACHO EAGLE 220V", qty: 0, newQty: 0 },
  { id: "3", name: "LADRILLO", qty: 20, newQty: 20 },
];

const BOLETAS: Boleta[] = [
  { id: "b1", code: "NOVARUM", number: "C.01", date: "Ayer 10:25 am", batch: "b.234" },
  { id: "b2", code: "NOVARUM", number: "C.01", date: "Ayer 10:25 am", batch: "b.234" },
  { id: "b3", code: "NOVARUM", number: "C.01", date: "Ayer 10:25 am", batch: "b.234" },
];

export function BoletaPedido() {
  const [mode, setMode] = useState<Mode>("slab");

  const goTo = (next: Mode) => {
    haptic.select();
    setMode(next);
  };

  const completeOrder = (destination: string) => {
    haptic.complete();
    console.log("Order →", destination);
    setMode("slab");
  };

  return (
    <div className="boleta-pedido">
      <div className="boleta-pedido__viewport">
        {/* Status bar mockup */}
        <div className="boleta-pedido__status-bar" />

        {/* Stack de boletas — la primera es la "principal" (expandible) */}
        <div className="boleta-pedido__stack">
          <BoletaCardCollapsed boleta={BOLETAS[2]} />
          <BoletaCardCollapsed boleta={BOLETAS[1]} />
          <BoletaCardMain
            boleta={BOLETAS[0]}
            mode={mode}
            onToggle={() => goTo(mode === "closed" ? "slab" : "closed")}
            onClose={() => goTo("closed")}
          />
        </div>

        {/* Bottom action area — varía según el mode */}
        <AnimatePresence mode="wait" initial={false}>
          {mode === "slab" && (
            <motion.div
              key="bottom-slab"
              className="boleta-pedido__bottom"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={springs.expanding}
            >
              <ToggleCards visibility="open" onClick={() => goTo("closed")} />
              <Button layout="icon" color="white" icon="search" onClick={() => haptic.select()} />
              <PedirPill onClick={() => goTo("confirm")} />
            </motion.div>
          )}

          {mode === "confirm" && (
            <motion.div
              key="bottom-confirm"
              className="boleta-pedido__bottom boleta-pedido__bottom--confirm"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={springs.expanding}
            >
              <Button
                label="PEDIR"
                color="green"
                layout="icon-right"
                icon="arrow-right"
                style={{ flex: 1 }}
                onClick={() => goTo("menu")}
              />
              <Button layout="icon" color="black" icon="close" onClick={() => goTo("slab")} />
            </motion.div>
          )}

          {mode === "menu" && (
            <motion.div
              key="bottom-menu"
              className="boleta-pedido__bottom boleta-pedido__bottom--menu"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={springs.expanding}
            >
              <div className="boleta-pedido__menu">
                <MenuItem label="PEDIDOS"   iconName="list"     onClick={() => completeOrder("PEDIDOS")} />
                <MenuItem label="ENTREGADO" iconName="entrega"  onClick={() => completeOrder("ENTREGADO")} />
                <MenuItem label="TRASLADO"  iconName="traslado" onClick={() => completeOrder("TRASLADO")} />
                <Button size="sm" layout="icon" color="white" icon="close" onClick={() => goTo("slab")} />
              </div>
              <PedirPill active onClick={() => goTo("slab")} />
            </motion.div>
          )}

          {mode === "closed" && (
            <motion.div
              key="bottom-closed"
              className="boleta-pedido__bottom"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={springs.expanding}
            >
              <ToggleCards visibility="close" onClick={() => goTo("slab")} />
              <Button layout="icon" color="white" icon="search" onClick={() => haptic.select()} />
              <PedirPill onClick={() => goTo("confirm")} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dev-only mode switcher para previsualizar estados sin completar el flujo */}
      <ModeSwitcher mode={mode} setMode={setMode} />
    </div>
  );
}

/* ============================================================
 * Boleta cards (composición específica del screen — no genérica)
 * ============================================================ */

function BoletaCardCollapsed({ boleta }: { boleta: Boleta }) {
  return (
    <div className="boleta-card boleta-card--collapsed">
      <BoletaCardHeader boleta={boleta} showActions={false} />
    </div>
  );
}

function BoletaCardMain({
  boleta,
  mode,
  onToggle,
  onClose,
}: {
  boleta: Boleta;
  mode: Mode;
  onToggle: () => void;
  onClose: () => void;
}) {
  const isClosed = mode === "closed";
  const isConfirm = mode === "confirm";

  return (
    <motion.div
      className="boleta-card boleta-card--main"
      layout
      transition={springs.expanding}
    >
      <BoletaCardHeader boleta={boleta} onToggle={onToggle} onClose={onClose} showActions />

      <AnimatePresence initial={false}>
        {!isClosed && (
          <motion.div
            key="body"
            className="boleta-card__body"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={springs.expanding}
          >
            <div className="boleta-card__divider" />
            {ITEMS.map((item) => (
              <ItemRow key={item.id} item={item} mode={mode} />
            ))}
            {isConfirm && <div className="boleta-card__progress" aria-hidden />}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function BoletaCardHeader({
  boleta,
  onToggle,
  onClose,
  showActions,
}: {
  boleta: Boleta;
  onToggle?: () => void;
  onClose?: () => void;
  showActions: boolean;
}) {
  return (
    <div className="boleta-card__header">
      <div className="boleta-card__title-block">
        <span className="boleta-card__code">{boleta.code}</span>
        <h2 className="boleta-card__number">{boleta.number}</h2>
        <div className="boleta-card__meta">
          <Icon name="info" size="sm" />
          <span>{boleta.date}</span>
          <span>{boleta.batch}</span>
        </div>
      </div>

      {showActions && (
        <div className="boleta-card__actions">
          <Icon name="check" size="md" />
          <Button size="sm" layout="icon" color="black" icon="open" onClick={onToggle} />
          <Button size="sm" layout="icon" color="gray" icon="close" onClick={onClose} />
        </div>
      )}
    </div>
  );
}

function ItemRow({ item, mode }: { item: Item; mode: Mode }) {
  const isConfirm = mode === "confirm";
  const isExcess = item.newQty > item.qty;

  return (
    <div className="item-row">
      <span className="item-row__name">{item.name}</span>
      <div className="item-row__qty">
        <span className="qty-pill qty-pill--current">{item.qty}</span>
        {isConfirm && (
          <motion.span
            className={`qty-pill qty-pill--new ${isExcess ? "qty-pill--excess" : ""}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={springs.snappy}
          >
            {isExcess ? `+${item.newQty - item.qty}` : item.newQty}
          </motion.span>
        )}
      </div>
    </div>
  );
}

/* ============================================================
 * Bottom-bar pieces
 * ============================================================ */

function PedirPill({ onClick, active = false }: { onClick: () => void; active?: boolean }) {
  const [pressed, setPressed] = useState(false);
  const cancelled = React.useRef(false);
  return (
    <button
      className={`pedir-pill ${active ? "pedir-pill--active" : ""}`}
      aria-label="Pedir"
      style={{ position: "relative", WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}
      onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); cancelled.current = false; setPressed(true); haptic.select(); }}
      onPointerUp={() => { setPressed(false); if (!cancelled.current) setTimeout(() => onClick(), 100); }}
      onPointerLeave={() => { if (pressed) { cancelled.current = true; setPressed(false); } }}
      onPointerCancel={() => { cancelled.current = true; setPressed(false); }}
    >
      <span>PEDIR</span>
      <Icon name="open" size="sm" />
      <span aria-hidden style={{ position: "absolute", inset: -8, borderRadius: 40, border: "8px solid rgb(133,166,41)", pointerEvents: "none", opacity: pressed ? 1 : 0, transition: pressed ? "opacity 80ms ease-out" : "opacity 180ms ease-out 120ms" }} />
    </button>
  );
}

function MenuItem({
  label,
  iconName,
  onClick,
}: {
  label: string;
  iconName: string;
  onClick: () => void;
}) {
  return (
    <Button
      layout="icon-left"
      color="black"
      fullWidth
      icon={iconName as IconName}
      label={label}
      onClick={onClick}
    />
  );
}

function ModeSwitcher({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) {
  const modes: Mode[] = ["slab", "confirm", "menu", "closed"];
  return (
    <div className="boleta-pedido__dev-switcher" aria-label="Dev mode switcher">
      {modes.map((m) => (
        <Button
          key={m}
          label={m}
          variant={mode === m ? "primary" : "secondary"}
          state={mode === m ? "pressed" : "standard"}
          onClick={() => setMode(m)}
        />
      ))}
    </div>
  );
}
