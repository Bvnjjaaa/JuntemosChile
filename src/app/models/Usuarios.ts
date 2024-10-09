import { Roles } from './Roles';

export interface Usuarios {
  id_usuario: number;     // ID del usuario
  creado_en: string;      // Fecha de creación
  usuario: string;        // Nombre de usuario
  contrasena: string;     // Contraseña del usuario
  correo: string;         // Correo del usuario
  id_rol: number;         // ID del rol, que es clave foránea
  rol: Roles;             // Rol relacionado (ahora es obligatorio)
}