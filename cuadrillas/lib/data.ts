import raw from "./cuadrillas.json";

export type Cuadrilla = { id: string; nombre: string; lider: string; miembros: string[] };

export const CUADRILLAS: Cuadrilla[] = raw as Cuadrilla[];
export const POR_ID: Record<string, Cuadrilla> = Object.fromEntries(CUADRILLAS.map((c) => [c.id, c]));

/** Nombres que se repiten (p. ej. "Bodega" con tres líderes) — se desambiguan con el líder. */
const conteo = CUADRILLAS.reduce<Record<string, number>>((a, c) => ((a[c.nombre] = (a[c.nombre] ?? 0) + 1), a), {});
export const repetido = (c: Cuadrilla) => conteo[c.nombre] > 1;

export const COLUMNAS = [
  { id: "ovet", nombre: "Ovet" },
  { id: "gemelo", nombre: "Gemelo" },
  { id: "carreno", nombre: "Carreño" },
  { id: "joel", nombre: "Joel" },
  { id: "libre", nombre: "Libre" },
] as const;
export type ColumnaId = (typeof COLUMNAS)[number]["id"];
export type Tablero = Record<ColumnaId, string[]>;

export const tableroInicial = (): Tablero => ({
  ovet: [],
  gemelo: [],
  carreno: [],
  joel: [],
  libre: [...CUADRILLAS].sort((a, b) => b.miembros.length - a.miembros.length).map((c) => c.id),
});
