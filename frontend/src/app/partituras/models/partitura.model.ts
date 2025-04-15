export interface Partitura {
    id?: number;
    titulo: string;
    compositor: string;
    descripcion?: string;
    dificultad: string;
    archivo_pdf: File | string;
    fecha_creacion?: Date;
    usuario?: any;
    instrumentos?: any[];
    ensamble?: any;
}