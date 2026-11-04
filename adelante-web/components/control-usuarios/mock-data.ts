/**
 * Mock data — mirrors the SwiftUI P2 prototype's `MockData.swift`.
 * Single source of truth. No persistence, no localStorage.
 * See P2_SPEC.md §5 for the canonical shape.
 *
 * `shortName` uses Unicode "…" (U+2026), NOT three dots.
 */

export type Assignment = {
  id: string;
  role: string;            // "Ingeniero", "Visor"
  obras: string;           // "Casa Bosque", "Edificio Centro"
  obrasHasChevron: boolean;
};

export type User = {
  id: string;
  shortName: string;       // "Juan… Perez…"
  fullName: string;        // "Juan Antonio Perez Lopez"
  status: "active" | "inactive";
  area: string;            // "Producción"
  assignments: Assignment[];
  isExpanded: boolean;     // sample 2 starts true to match the M1 frame
  isCompleted: boolean;    // drives the ✓ icon in collapsed state
};

export const sampleUsers: User[] = [
  {
    id: "u1",
    shortName: "Juan… Perez…",
    fullName: "Juan Antonio Perez Lopez",
    status: "active",
    area: "Producción",
    assignments: [
      { id: "a1", role: "Ingeniero", obras: "Casa Bosque",     obrasHasChevron: true  },
      { id: "a2", role: "Visor",     obras: "Edificio Centro", obrasHasChevron: false },
    ],
    isExpanded: false,
    isCompleted: true,
  },
  {
    id: "u2",
    shortName: "Juan… Perez…",
    fullName: "Juan Alberto Perez Medina",
    status: "active",
    area: "Producción",
    assignments: [
      { id: "a3", role: "Ingeniero", obras: "Viviendas",       obrasHasChevron: true  },
      { id: "a4", role: "Visor",     obras: "Infraestructura", obrasHasChevron: false },
    ],
    isExpanded: true,
    isCompleted: true,
  },
  {
    id: "u3",
    shortName: "Juan… Perez…",
    fullName: "Juan Manuel Perez Cruz",
    status: "active",
    area: "Construcción",
    assignments: [
      { id: "a5", role: "Supervisor", obras: "Torre Norte", obrasHasChevron: false },
    ],
    isExpanded: false,
    isCompleted: true,
  },
];

// Sheet pickers
export const areasDeTrabajo = ["Producción", "Logística", "Bodega", "Administración", "Construcción"];
export const puestosDeTrabajo = ["Operario", "Supervisor", "Asistente", "Encargado"];
export const salarios = ["₡500.000", "₡750.000", "₡1.000.000", "₡1.250.000"];
export const fechasIngreso = ["2026-01-15", "2026-03-01", "2026-05-10"];
export const rolesDisponibles = ["Maestro de obras", "Encargado", "Transportista", "Bodeguero", "Peón"];

// Desktop (kept here so both prototypes share one mock module)
export const desktopUsers = Array.from({ length: 5 }, (_, i) => ({
  id: `d${i + 1}`,
  nombre: "Juan Perez",
  area: "Producción",
  cedula: "1-0234-5678",
  contacto: "8812-3232",
  rol: "Ingeniero",
  estado: (i % 2 === 0 ? "activo" : "inactivo") as "activo" | "inactivo",
}));

/**
 * Legacy export for old code that imports `mockWorkers`. Maps to the new
 * `sampleUsers` shape. Remove once all call sites migrate.
 *
 * @deprecated Use `sampleUsers` instead.
 */
export type Worker = User & {
  nombre: string;                  // legacy alias of fullName
  rolPrimary: string;
  obraPrimary: string;
  rolSecondary?: string;
  obraSecondary?: string;
  cedula: string;
  contacto: string;
  estado: "activo" | "completado" | "inactivo";
};

export const mockWorkers: Worker[] = sampleUsers.map((u) => ({
  ...u,
  nombre: u.shortName,            // legacy field used by old WorkerCard
  cedula: "1-0234-5678",
  contacto: "8812-3232",
  rolPrimary: u.assignments[0]?.role ?? "",
  obraPrimary: u.assignments[0]?.obras ?? "",
  rolSecondary: u.assignments[1]?.role,
  obraSecondary: u.assignments[1]?.obras,
  estado: u.status === "active" ? "activo" : "inactivo",
}));
