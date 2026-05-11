import React, { useState } from "react";
import { AnimatePresence, motion, useAnimationControls, useMotionValue, useTransform } from "motion/react";
import { springs } from "../../springs";
import { haptic } from "../../haptic";
import { QtyPill, type QtyVariant as DSQtyVariant } from "../../QtyPill/QtyPill";
import { ScrollPicker } from "../../ScrollPicker/ScrollPicker";
import { SelectionDropdown, type SelectionItem } from "../../SelectionDropdown/SelectionDropdown";
import { SlideButton } from "../../SlideButton/SlideButton";
import "./Test1Detail.css";

/**
 * Test1Detail — pantalla de detalle de materiales (abierta desde qtyPill).
 *
 * Permite:
 *  - editar el nombre de cada material (tap → input inline)
 *  - editar cantidades con stepper (− / +)
 *  - eliminar materiales
 *  - agregar nuevos via SelectionDropdown (catálogo buscable)
 */

export type QtyVariant = DSQtyVariant;
export type CatalogItem = SelectionItem;

export interface Material {
  id: string;
  name: string;
  /** Cantidad entregada — se muestra en el pill circular, es la que el usuario edita */
  qty: number;
  /** Cantidad presupuestada (plan original) */
  budgeted?: number;
  /** Cantidad solicitada al proveedor */
  requested?: number;
  /** Override manual; si no se da, se computa de entregada vs solicitada */
  variant?: QtyVariant;
}

/**
 * Deriva la variante visual del pill comparando entregada (qty) vs solicitada (requested).
 *  - entregada == solicitada → ok (verde, coincide)
 *  - entregada > solicitada  → alert (rojo, sobrepasa)
 *  - entregada < solicitada  → default (amarillo, pendiente)
 */
export function computeVariant(qty: number, requested?: number): QtyVariant {
  if (requested == null) return "default";
  if (qty > requested) return "alert";
  if (qty === requested) return "ok";
  return "default";
}

interface Test1DetailProps {
  initialMaterials: Material[];
  onBack: (materials: Material[]) => void;
  /** Catálogo de materiales disponibles para agregar */
  catalog?: CatalogItem[];
}

export const DEFAULT_CATALOG: CatalogItem[] = [
  { code: "CON-110-220", name: "CONECTOR ADAPTADOR HEMBRA EAGLE 110V SALIDA MACHO EAGLE 220V" },
  { code: "LAD-COMUN", name: "LADRILLO COMÚN" },
  { code: "LAD-PERFO", name: "LADRILLO PERFORADO" },
  { code: "CEM-50KG", name: "CEMENTO PORTLAND 50KG" },
  { code: "VAR-12MM", name: "VARILLA DE HIERRO 12MM" },
  { code: "ARE-FINA", name: "ARENA FINA M³" },
  { code: "TUB-PVC-110", name: "TUBO PVC SANITARIO 110MM" },
  { code: "PIN-LATEX", name: "PINTURA LÁTEX BLANCA 4L" },
];

let nextId = 1000;
const newId = () => `m-${nextId++}`;

export function Test1Detail({ initialMaterials, onBack, catalog = DEFAULT_CATALOG }: Test1DetailProps) {
  const [materials, setMaterials] = useState<Material[]>(initialMaterials);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const setQty = (id: string, qty: number) => {
    haptic.select();
    setMaterials((list) =>
      list.map((m) =>
        m.id === id ? { ...m, qty: Math.max(0, Math.floor(qty)) } : m,
      ),
    );
  };

  const removeMaterial = (id: string) => {
    haptic.delete();
    setMaterials((list) => list.filter((m) => m.id !== id));
  };

  const addMaterial = (item: CatalogItem) => {
    haptic.complete();
    setMaterials((list) => [
      ...list,
      { id: newId(), name: item.name, qty: 1 },
    ]);
    setDropdownOpen(false);
  };

  const handleBack = () => {
    haptic.select();
    onBack(materials);
  };

  return (
    <div className="td">
      <div className="td__viewport">
        <header className="td__header">
          <motion.button
            className="td__back"
            onClick={handleBack}
            whileTap={{ scale: 0.92 }}
            transition={springs.snappy}
            aria-label="Volver"
          >
            <ArrowLeftIcon />
          </motion.button>
          <h1 className="td__title">Materiales</h1>
        </header>

        <ul className="td__list" aria-label="Lista de materiales">
          <AnimatePresence initial={false}>
            {materials.map((m) => (
              <motion.li
                key={m.id}
                layout
                initial={{ opacity: 0, y: 12, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={springs.expanding}
              >
                <MaterialRow
                  material={m}
                  onQtyChange={(q) => setQty(m.id, q)}
                  onRemove={() => removeMaterial(m.id)}
                />
              </motion.li>
            ))}
          </AnimatePresence>

          {materials.length === 0 && (
            <motion.li
              className="td__empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={springs.settling}
            >
              <BoxIcon />
              <p className="td__empty-title">No hay materiales</p>
              <p className="td__empty-hint">Tocá <strong>Agregar material</strong> abajo para empezar.</p>
            </motion.li>
          )}
        </ul>

        <div className="td__footer">
          <SelectionDropdown
            open={dropdownOpen}
            onOpenChange={setDropdownOpen}
            items={catalog.filter((c) => !materials.some((m) => m.name === c.name))}
            onSelect={addMaterial}
            triggerLabel="Agregar material"
            searchPlaceholder="Buscar por nombre o código"
          />

          <SlideButton
            label="Pedir"
            confirmedLabel="Confirmado"
            onConfirm={handleBack}
            disabled={materials.length === 0}
            disabledLabel="Agregá un material"
          />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
 * MaterialRow — fila editable
 * ============================================================ */

const SWIPE_DELETE_THRESHOLD = 120;
const SWIPE_DELETE_VELOCITY = 700;
const SWIPE_MAX_DRAG = 240;

function MaterialRow({
  material,
  onQtyChange,
  onRemove,
}: {
  material: Material;
  onQtyChange: (qty: number) => void;
  onRemove: () => void;
}) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const x = useMotionValue(0);
  const controls = useAnimationControls();

  // The red delete background reveals as the card slides left;
  // its label/icon scale up slightly past the delete threshold for clarity.
  const bgIconScale = useTransform(
    x,
    [-SWIPE_MAX_DRAG, -SWIPE_DELETE_THRESHOLD, 0],
    [1.15, 1.05, 0.85],
  );

  const openPicker = () => {
    haptic.select();
    setPickerOpen(true);
  };

  const variant = material.variant ?? computeVariant(material.qty, material.requested);
  const hasBudget = material.budgeted != null;
  const hasRequested = material.requested != null;

  const ariaSummary = [
    `entregada ${material.qty}`,
    hasRequested ? `solicitada ${material.requested}` : null,
    hasBudget ? `presupuestada ${material.budgeted}` : null,
  ]
    .filter(Boolean)
    .join(", ");

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const draggedFar = info.offset.x < -SWIPE_DELETE_THRESHOLD;
    const flickedFast = info.velocity.x < -SWIPE_DELETE_VELOCITY;
    if (draggedFar || flickedFast) {
      haptic.delete();
      controls
        .start({ x: -600, transition: springs.deleting })
        .then(() => onRemove());
    } else {
      haptic.drag();
      controls.start({ x: 0, transition: springs.snappy });
    }
  };

  return (
    <div className="td-row-track">
      <div className="td-row__delete-bg" aria-hidden>
        <motion.span className="td-row__delete-icon" style={{ scale: bgIconScale }}>
          <TrashIcon />
        </motion.span>
        <span className="td-row__delete-label">Eliminar</span>
      </div>

      <motion.div
        className="td-row"
        drag="x"
        dragConstraints={{ left: -SWIPE_MAX_DRAG, right: 0 }}
        dragElastic={{ left: 0.15, right: 0 }}
        dragMomentum={false}
        style={{ x }}
        animate={controls}
        onDragStart={() => haptic.select()}
        onDragEnd={handleDragEnd}
      >
        <motion.button
          type="button"
          className="td-row__main"
          onClick={openPicker}
          whileTap={{ scale: 0.98 }}
          transition={springs.snappy}
          aria-label={`${material.name} — ${ariaSummary}, tocá para editar; deslizá a la izquierda para eliminar`}
        >
          <p className="td-row__name">{material.name}</p>

          <div className="td-row__right">
            <QtyPill value={material.qty} variant={variant} />
            {(hasRequested || hasBudget) && (
              <div className="td-row__mini-stats" aria-hidden>
                {hasRequested && (
                  <span className="td-row__mini">
                    <span className="td-row__dot td-row__dot--sol" />
                    SOL: <strong>{material.requested}</strong>
                  </span>
                )}
                {hasBudget && (
                  <span className="td-row__mini">
                    <span className="td-row__dot td-row__dot--pre" />
                    PRE: <strong>{material.budgeted}</strong>
                  </span>
                )}
              </div>
            )}
          </div>
        </motion.button>
      </motion.div>

      <ScrollPicker
        open={pickerOpen}
        initialValue={material.qty}
        contextLabel={material.name}
        variant={variant}
        onClose={() => setPickerOpen(false)}
        onConfirm={(q) => {
          onQtyChange(q);
          setPickerOpen(false);
        }}
      />
    </div>
  );
}
/* ============================================================
 * Inline icons
 * ============================================================ */

function ArrowLeftIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function TrashIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function BoxIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 7l9-4 9 4-9 4-9-4zM3 7v10l9 4M21 7v10l-9 4M12 11v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
