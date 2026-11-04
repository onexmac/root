export type UserRole =
  | "Maestro de obras"
  | "Encargado"
  | "Transportista"
  | "Bodeguero"
  | "Peón"
  | "Ingeniero";

export type User = {
  id: string;
  nombre: string;
  area: string;
  cedula: string;
  contacto: string;
  rol: UserRole;
  estado: "activo" | "inactivo";
};

export const mockUsers: User[] = [
  { id: "1", nombre: "Juan Perez", area: "Producción", cedula: "1-0234-5678", contacto: "8812-3232", rol: "Ingeniero", estado: "activo" },
  { id: "2", nombre: "Juan Perez", area: "Producción", cedula: "1-0234-5678", contacto: "8812-3232", rol: "Ingeniero", estado: "inactivo" },
  { id: "3", nombre: "Juan Perez", area: "Producción", cedula: "1-0234-5678", contacto: "8812-3232", rol: "Ingeniero", estado: "activo" },
  { id: "4", nombre: "Juan Perez", area: "Producción", cedula: "1-0234-5678", contacto: "8812-3232", rol: "Ingeniero", estado: "inactivo" },
  { id: "5", nombre: "Juan Perez", area: "Producción", cedula: "1-0234-5678", contacto: "8812-3232", rol: "Ingeniero", estado: "activo" },
];

export const roles: UserRole[] = [
  "Maestro de obras",
  "Encargado",
  "Transportista",
  "Bodeguero",
  "Peón",
];

export const areasDeTrabajo = ["Producción", "Logística", "Bodega", "Administración"];
export const puestosDeTrabajo = ["Operario", "Supervisor", "Asistente", "Encargado"];
export const salarios = ["₡500.000", "₡750.000", "₡1.000.000", "₡1.250.000"];
