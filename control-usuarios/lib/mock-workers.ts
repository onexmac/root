export type Worker = {
  id: string;
  nombre: string;
  area: string;
  rolPrimary: string;
  obraPrimary: string;
  rolSecondary?: string;
  obraSecondary?: string;
  estado: "activo" | "completado";
};

export const mockWorkers: Worker[] = [
  { id: "1", nombre: "Juan... Perez...", area: "Producción", rolPrimary: "Ingeniero", obraPrimary: "Viviendas", estado: "completado" },
  {
    id: "2",
    nombre: "Juan Alberto Perez Medina",
    area: "Producción",
    rolPrimary: "Ingeniero",
    obraPrimary: "Viviendas",
    rolSecondary: "Visor",
    obraSecondary: "Infraestructura",
    estado: "activo",
  },
  { id: "3", nombre: "Juan... Perez...", area: "Producción", rolPrimary: "Ingeniero", obraPrimary: "Viviendas", estado: "completado" },
];
