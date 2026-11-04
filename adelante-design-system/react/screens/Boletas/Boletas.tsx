import React, { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface LineItem {
  id: string;
  itemNo: string;
  descripcion: string;
  stockOrigen: number;
  unidad: string;
  almacenOrigen: string;
  cantidadOrigen: number;
  cantidadDestino: number;
}

interface FormData {
  obraDestino: string;
  actividadObra: string;
  numeroBoleta: string;
  fechaBoleta: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_ITEMS: LineItem[] = [
  { id: "1", itemNo: "M01-0147", descripcion: "VARILLA # DEFORME 3 G40", stockOrigen: 650, unidad: "UND", almacenOrigen: "ALM GRAL", cantidadOrigen: 230, cantidadDestino: 0 },
  { id: "2", itemNo: "M01-0008", descripcion: "PLATINA DE ACERO ESMALTADA 4\"", stockOrigen: 17,  unidad: "UND", almacenOrigen: "ALM GRAL", cantidadOrigen: 17,  cantidadDestino: 0 },
  { id: "3", itemNo: "M01-0023", descripcion: "TUBO CONDUIT EMT 1/2\" X 3M", stockOrigen: 42,  unidad: "UND", almacenOrigen: "ALM GRAL", cantidadOrigen: 42,  cantidadDestino: 0 },
];

const ALMACENES = ["ALM-GRAL", "ALM-OBRA", "ALM-CENTRAL"];

// ─── Inline SVG Icons ─────────────────────────────────────────────────────────

const IconSearch = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2" />
    <path d="M13.5 13.5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const IconCart = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M1 1h2.5l1.8 8.5h9.4l1.8-5.5H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="8" cy="15" r="1.5" fill="currentColor" />
    <circle cx="13" cy="15" r="1.5" fill="currentColor" />
  </svg>
);

const IconChevron = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconCalendar = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M5 1v4M11 1v4M2 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconHash = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 6h10M3 10h10M6 3l-1.5 10M11.5 3l-1.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ─── Sub-components ───────────────────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="boletas-field__label">{children}</span>;
}

function SelectField({
  label,
  value,
  options,
  onChange,
  placeholder,
  icon,
}: {
  label?: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="boletas-field">
      {label && <FieldLabel>{label}</FieldLabel>}
      <div className="boletas-field__input-wrap">
        {icon && <span className="boletas-field__icon">{icon}</span>}
        <select
          className="boletas-field__select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <span className="boletas-field__chevron"><IconChevron /></span>
      </div>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type,
  icon,
}: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="boletas-field">
      {label && <FieldLabel>{label}</FieldLabel>}
      <div className="boletas-field__input-wrap">
        {icon && <span className="boletas-field__icon">{icon}</span>}
        <input
          className="boletas-field__input"
          type={type || "text"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

function TableRow({
  item,
  onCantidadChange,
}: {
  item: LineItem;
  onCantidadChange: (id: string, val: number) => void;
}) {
  return (
    <div className="boletas-table__row">
      {/* Item No + Descripción */}
      <div className="boletas-table__cell boletas-table__cell--item">
        <span className="boletas-table__item-no">{item.itemNo}</span>
        <span className="boletas-table__desc">{item.descripcion}</span>
      </div>

      {/* Stock Origen */}
      <div className="boletas-table__cell boletas-table__cell--stock">
        <div className="boletas-alm-tag">
          <IconCart />
          <span>{item.almacenOrigen}</span>
        </div>
        <span className="boletas-table__stock-num">{item.stockOrigen}</span>
        <span className="boletas-table__unit">{item.unidad}</span>
      </div>

      {/* Cantidad Origen */}
      <div className="boletas-table__cell boletas-table__cell--qty">
        <input
          className="boletas-table__qty-input"
          type="number"
          min={0}
          max={item.stockOrigen}
          value={item.cantidadOrigen}
          onChange={(e) => onCantidadChange(item.id, Number(e.target.value))}
        />
      </div>

      {/* Cantidad Destino */}
      <div className="boletas-table__cell boletas-table__cell--qty">
        <input
          className="boletas-table__qty-input boletas-table__qty-input--destino"
          type="number"
          min={0}
          value={item.cantidadDestino}
          onChange={() => {}}
          readOnly
        />
      </div>
    </div>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export function Boletas() {
  const [items, setItems] = useState<LineItem[]>(MOCK_ITEMS);
  const [searchQuery, setSearchQuery] = useState("");
  const [almacenFiltro, setAlmacenFiltro] = useState("ALM-GRAL");
  const [cantidadBuscar, setCantidadBuscar] = useState("0");
  const [form, setForm] = useState<FormData>({
    obraDestino: "",
    actividadObra: "",
    numeroBoleta: "",
    fechaBoleta: "30/04/2026",
  });

  const updateForm = (key: keyof FormData) => (v: string) =>
    setForm((prev) => ({ ...prev, [key]: v }));

  const updateCantidad = (id: string, val: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, cantidadOrigen: val } : item
      )
    );
  };

  const filteredItems = items.filter(
    (item) =>
      item.itemNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.descripcion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRegistrar = () => {
    alert(`Boleta #${form.numeroBoleta || "—"} registrada`);
  };

  return (
    <div className="boletas-screen">

      {/* ── Search / Filter Bar ── */}
      <div className="boletas-searchbar">
        <div className="boletas-searchbar__stock">
          <span className="boletas-searchbar__stock-num">{cantidadBuscar}</span>
        </div>

        <div className="boletas-searchbar__input-wrap">
          <input
            className="boletas-searchbar__input"
            type="text"
            placeholder="Buscar por Item No | Descripcion..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <button className="boletas-searchbar__btn" aria-label="Buscar">
          <IconSearch />
        </button>

        <div className="boletas-searchbar__almacen">
          <select
            className="boletas-searchbar__select"
            value={almacenFiltro}
            onChange={(e) => setAlmacenFiltro(e.target.value)}
          >
            {ALMACENES.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
          <IconChevron />
        </div>

        <input
          className="boletas-searchbar__qty"
          type="number"
          min={0}
          value={cantidadBuscar}
          onChange={(e) => setCantidadBuscar(e.target.value)}
          placeholder="0"
        />
      </div>

      {/* ── Table ── */}
      <div className="boletas-table">
        {/* Header */}
        <div className="boletas-table__header">
          <div className="boletas-table__head boletas-table__head--item">
            Item No &nbsp;·&nbsp; Descripción
          </div>
          <div className="boletas-table__head boletas-table__head--stock">
            Stock Origen
          </div>
          <div className="boletas-table__head boletas-table__head--qty">
            Cantidad Origen
          </div>
          <div className="boletas-table__head boletas-table__head--qty">
            Cantidad Destino
          </div>
        </div>

        {/* Rows */}
        <div className="boletas-table__body">
          {filteredItems.map((item) => (
            <TableRow key={item.id} item={item} onCantidadChange={updateCantidad} />
          ))}
          {filteredItems.length === 0 && (
            <div className="boletas-table__empty">
              No se encontraron ítems para "{searchQuery}"
            </div>
          )}
        </div>
      </div>

      {/* ── Bottom Form ── */}
      <div className="boletas-form">
        <div className="boletas-form__row">
          <SelectField
            label="Obra destino"
            value={form.obraDestino}
            options={["OBRA-001", "OBRA-002", "OBRA-003"]}
            onChange={updateForm("obraDestino")}
            placeholder="Obra destino..."
            icon={<IconChevron />}
          />
          <SelectField
            label="Actividad obra"
            value={form.actividadObra}
            options={["CIMENTACIÓN", "ESTRUCTURA", "ACABADOS"]}
            onChange={updateForm("actividadObra")}
            placeholder="Actividad obra..."
            icon={<IconChevron />}
          />
          <InputField
            label="Numero Boleta"
            value={form.numeroBoleta}
            onChange={updateForm("numeroBoleta")}
            placeholder="# Boleta..."
            icon={<IconHash />}
          />
          <InputField
            label="Fecha de Boleta"
            value={form.fechaBoleta}
            onChange={updateForm("fechaBoleta")}
            type="date"
            icon={<IconCalendar />}
          />

          <button
            className="boletas-form__btn"
            onClick={handleRegistrar}
          >
            REGISTRAR
          </button>
        </div>
      </div>
    </div>
  );
}
