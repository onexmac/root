import React, { useState, useRef } from "react";
import { Button } from "../../Button/Button";

// ─── Types ───────────────────────────────────────────────────────────────────

type ScreenView = "slab" | "confirm" | "menu" | "closeCard";
type MaterialStatus = "incompleto" | "pendiente" | "completo" | "sinstock";

interface Material {
  name: string;
  quantity: number;
  target: number;
  status: MaterialStatus;
}

interface SolicitudData {
  id: string;
  company: string;
  code: string;
  time: string;
  boleta: string;
  isGood: boolean;
  materials: Material[];
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_SOLICITUDES: SolicitudData[] = [
  {
    id: "1",
    company: "NOVARUM",
    code: "C.01",
    time: "Ayer 10:25 am",
    boleta: "b.234",
    isGood: true,
    materials: [
      {
        name: "CONECTOR ADAPTADOR HEMBRA EAGLE 110V SALIDA MACHO EAGLE 220V",
        quantity: 10,
        target: 10,
        status: "completo",
      },
      {
        name: "CONECTOR ADAPTADOR HEMBRA EAGLE 110V SALIDA MACHO EAGLE 220V",
        quantity: 0,
        target: 10,
        status: "incompleto",
      },
      {
        name: "LADRILLO",
        quantity: 20,
        target: 20,
        status: "completo",
      },
    ],
  },
  {
    id: "2",
    company: "NOVARUM",
    code: "C.01",
    time: "Ayer 10:25 am",
    boleta: "b.234",
    isGood: true,
    materials: [
      {
        name: "CONECTOR ADAPTADOR HEMBRA EAGLE 110V SALIDA MACHO EAGLE 220V",
        quantity: 10,
        target: 10,
        status: "completo",
      },
    ],
  },
  {
    id: "3",
    company: "NOVARUM",
    code: "C.01",
    time: "Ayer 10:25 am",
    boleta: "b.234",
    isGood: false,
    materials: [
      {
        name: "CONECTOR ADAPTADOR HEMBRA EAGLE 110V SALIDA MACHO EAGLE 220V",
        quantity: 10,
        target: 10,
        status: "completo",
      },
    ],
  },
];

// ─── Icons (inline SVG) ───────────────────────────────────────────────────────

const IconCheck = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconChevronUp = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 10l4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconInfo = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 7v4M8 5.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconBack = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M12 5l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconSearch = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2" />
    <path d="M13.5 13.5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconClose = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const IconList = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M5 6h10M5 10h10M5 14h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const IconDelivery = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="3" y="7" width="14" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconTransfer = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M4 8h12M13 5l3 3-3 3M16 12H4M7 9l-3 3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Sub-components ───────────────────────────────────────────────────────────

function QuantityBar({ quantity, target, status }: { quantity: number; target: number; status: MaterialStatus }) {
  const fill = target > 0 ? Math.min(quantity / target, 1) : 0;
  return (
    <div className="qty-selector">
      <span className={`qty-selector__num qty-selector__num--${status}`}>{quantity}</span>
      <div className="qty-selector__bar-track">
        <div
          className={`qty-selector__bar-fill qty-selector__bar-fill--${status}`}
          style={{ height: `${fill * 100}%` }}
        />
      </div>
    </div>
  );
}

function SolicitudCard({
  data,
  isOpen,
  onToggle,
}: {
  data: SolicitudData;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`solicitud-card ${isOpen ? "solicitud-card--open" : "solicitud-card--closed"}`}>
      {/* Card Header */}
      <div className="solicitud-card__header">
        <div className="solicitud-card__info">
          <span className="solicitud-card__company">{data.company}</span>
          <span className="solicitud-card__code">{data.code}</span>
          <div className="solicitud-card__meta">
            <span className="solicitud-card__time">{data.time}</span>
            <IconInfo />
            <span className="solicitud-card__boleta">{data.boleta}</span>
          </div>
        </div>

        <div className="solicitud-card__controls">
          {data.isGood && (
            <span className="solicitud-card__badge solicitud-card__badge--good">
              <IconCheck />
            </span>
          )}
          <Button
            size="sm"
            layout="icon"
            color="gray"
            icon={isOpen ? "arrow-up" : "arrow-down"}
            onClick={onToggle}
          />
        </div>
      </div>

      {/* Materials List */}
      <div className={`solicitud-card__body ${isOpen ? "solicitud-card__body--visible" : ""}`}>
        <div className="solicitud-card__divider" />
        {data.materials.map((mat, i) => (
          <div key={i} className="material-row">
            <span className="material-row__name">{mat.name}</span>
            <QuantityBar quantity={mat.quantity} target={mat.target} status={mat.status} />
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideButton({ onConfirm }: { onConfirm: () => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const maxDrag = 200;

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startXRef.current = e.clientX - dragX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const newX = Math.max(0, Math.min(e.clientX - startXRef.current, maxDrag));
    setDragX(newX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    if (dragX / maxDrag > 0.72) {
      if (navigator.vibrate) navigator.vibrate([10, 30, 10]);
      onConfirm();
    } else {
      setDragX(0);
    }
  };

  const progress = dragX / maxDrag;

  return (
    <div className="slide-btn" ref={trackRef}>
      <span
        className="slide-btn__label"
        style={{ opacity: 1 - progress * 2 }}
      >
        desliza para pedir
      </span>
      <div
        className="slide-btn__thumb"
        style={{
          transform: `translateX(${dragX}px)`,
          transition: isDragging ? "none" : "transform 300ms cubic-bezier(0.34,1.56,0.64,1)",
          background: `color-mix(in srgb, var(--ds-color-green-100) ${Math.round(progress * 100)}%, var(--ds-color-black) ${Math.round((1 - progress) * 100)}%)`,
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <span className="slide-btn__text">PEDIR</span>
        <IconArrow />
      </div>
    </div>
  );
}

function MenuDrawer({ onClose, onSelectOption }: { onClose: () => void; onSelectOption: (opt: string) => void }) {
  return (
    <div className="menu-drawer" onClick={onClose}>
      <div className="menu-drawer__panel" onClick={(e) => e.stopPropagation()}>
        <button className="menu-drawer__option" onClick={() => onSelectOption("pedidos")}>
          <span className="menu-drawer__icon"><IconList /></span>
          <span className="menu-drawer__label">PEDIDOS</span>
        </button>
        <button className="menu-drawer__option" onClick={() => onSelectOption("entregado")}>
          <span className="menu-drawer__icon"><IconDelivery /></span>
          <span className="menu-drawer__label">ENTREGADO</span>
        </button>
        <button className="menu-drawer__option" onClick={() => onSelectOption("traslado")}>
          <span className="menu-drawer__icon"><IconTransfer /></span>
          <span className="menu-drawer__label">TRASLADO</span>
        </button>
      </div>
    </div>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export function Slab() {
  const [view, setView] = useState<ScreenView>("slab");
  const [openCards, setOpenCards] = useState<Record<string, boolean>>(
    Object.fromEntries(MOCK_SOLICITUDES.map((s) => [s.id, true]))
  );

  const toggleCard = (id: string) => {
    setOpenCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleConfirm = () => setView("confirm");
  const handleCancel = () => setView("slab");
  const handleMenuOpen = () => setView("menu");
  const handleMenuClose = () => setView("slab");

  return (
    <div className="slab-screen">
      {/* ── Top Header ── */}
      <header className="slab-screen__header">
        <h1 className="slab-screen__title">Solicitudes</h1>
        <Button size="sm" layout="icon" color="white" icon="menu" onClick={handleMenuOpen} />
      </header>

      {/* ── Scrollable Card List ── */}
      <main className="slab-screen__content">
        {MOCK_SOLICITUDES.map((sol) => (
          <SolicitudCard
            key={sol.id}
            data={sol}
            isOpen={openCards[sol.id]}
            onToggle={() => toggleCard(sol.id)}
          />
        ))}
      </main>

      {/* ── Bottom Floating Bar ── */}
      <div className="slab-screen__bottom">
        <div className="slab-screen__nav">
          <Button size="sm" layout="icon" color="white" icon="back" />
          <Button size="sm" layout="icon" color="white" icon="search" />
        </div>

        {view === "slab" && (
          <SlideButton onConfirm={handleConfirm} />
        )}

        {view === "confirm" && (
          <div className="slab-confirm-bar">
            <Button size="sm" layout="icon" color="white" icon="close" onClick={handleCancel} />
            <Button label="PEDIR" color="green" fullWidth onClick={handleCancel} />
          </div>
        )}
      </div>

      {/* ── Menu Overlay ── */}
      {view === "menu" && (
        <MenuDrawer onClose={handleMenuClose} onSelectOption={handleMenuClose} />
      )}
    </div>
  );
}
