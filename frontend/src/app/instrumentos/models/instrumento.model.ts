export interface Instrumento {
    id?: number;
    nombre: string;
    tipo: string;
    descripcion?: string;
    imagen?: File | string;
}