export interface User {
    id?: number;
    correo: string;
    nombre: string;
    apellido: string;
    fecha_registro?: string;
    is_active?: boolean;
    is_staff?: boolean;
}