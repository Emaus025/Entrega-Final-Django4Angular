export interface Ensamble {
    id?: number;
    nombre: string;
    director: number;  // Should be ID only
    miembros: number[];  // Array of user IDs
    instrumentos: number[];  // Array of instrument IDs
    partituras: number[];  // Array of partitura IDs
    descripcion?: string;
    activo: boolean;
    fecha_creacion?: Date;
  }