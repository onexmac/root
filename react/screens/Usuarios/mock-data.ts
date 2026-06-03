/* ============================================================
 * Usuarios — mock data (U01–U07)
 * ============================================================ */

export type Estado = "activo" | "inactivo";

export interface UserRow {
  id: number;
  nombre: string;
  cedula: string;
  telefono: string;
  departamento: string;
  rol: string;
  estado: Estado;
}

export const USERS: UserRow[] = [
  { id: 1, nombre: "Juan Perez Castro", cedula: "3-0138-0148", telefono: "8812-3232", departamento: "Producción", rol: "Ingeniero", estado: "activo" },
  { id: 2, nombre: "Juan Perez Castro", cedula: "3-0138-0148", telefono: "8812-3232", departamento: "Producción", rol: "Ingeniero", estado: "inactivo" },
  { id: 3, nombre: "Juan Perez Castro", cedula: "3-0138-0148", telefono: "8812-3232", departamento: "Producción", rol: "Ingeniero", estado: "activo" },
  { id: 4, nombre: "Juan Perez Castro", cedula: "3-0138-0148", telefono: "8812-3232", departamento: "Producción", rol: "Ingeniero", estado: "inactivo" },
  { id: 5, nombre: "Juan Perez Castro", cedula: "3-0138-0148", telefono: "8812-3232", departamento: "Producción", rol: "Ingeniero", estado: "activo" },
];

export const ROL_OPTIONS = ["Ingeniero", "Maestro de obra", "Ingeniero", "Maestro de obra", "Ingeniero", "Maestro de obra"];

export const JUAN_DETAIL = {
  nombre: "Juan Perez Castro",
  personal: {
    nombre: "Juan",
    primerApellido: "Perez",
    segundoApellido: "Castro",
    cedula: "3-0138-0148",
    genero: "Masculino",
    fechaNacimiento: "12/03/1990",
  },
  contacto: {
    pais: "Costa Rica",
    provincia: "Cartago",
    canton: "Cartago",
    distrito: "Cartago",
    direccion: "50 metros este de la Basílica de los Ángeles",
    correo: "jperez@gmail.com",
    telefono: "8812-3232",
    telefono2: "8812-3232",
  },
  puesto: {
    departamento: "Ingeniero",
    puesto: "Ing. eléctrico",
    fechaIngreso: "12/12/24",
    fechaSalida: "-",
    estado: "Activo",
    tallaCamisa: "S",
    tallaPantalon: "S",
  },
  usuario: {
    apps: "Boletas",
    roles: "Líder",
    tipo: "Definido",
    fecha: "Fecha definida",
    accesoApp: "Ventas",
    accesoRol: "Administrador",
  },
};

export type FilterMode = "search" | "search+list" | "list";

export const COLUMNS = [
  { key: "trabajador", label: "Trabajador", mode: "search" as FilterMode, placeholder: "Búsqueda por trabajador" },
  { key: "cedula", label: "Cédula", mode: "search" as FilterMode, placeholder: "Búsqueda por cédula" },
  { key: "telefono", label: "Teléfono", mode: "search" as FilterMode, placeholder: "Búsqueda por teléfono" },
  { key: "departamento", label: "Departamento", mode: "search+list" as FilterMode, placeholder: "Búsqueda por departamento" },
  { key: "rol", label: "Rol", mode: "search+list" as FilterMode, placeholder: "Búsqueda por rol" },
  { key: "estado", label: "Estado", mode: "list" as FilterMode, placeholder: "" },
] as const;

export type ColumnKey = (typeof COLUMNS)[number]["key"];

export const DEPARTAMENTO_OPTIONS = ["Todos", "Maestro de obra", "Ingeniero", "Maestro de obra", "Ingeniero", "Maestro de obra"];
export const ROL_LIST = ["Todos", "Ingeniero", "Maestro de obra", "Ingeniero", "Maestro de obra", "Ingeniero", "Maestro de obra"];
export const ESTADO_OPTIONS = [
  { label: "Todos", indicator: null as null | "activo" | "inactivo" },
  { label: "Activo", indicator: "activo" as const },
  { label: "Inactivo", indicator: "inactivo" as const },
];
