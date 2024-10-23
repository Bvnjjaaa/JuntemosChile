import { Roles } from './Roles';

export interface Usuarios {
  rolNombre: string;
  id_usuario: number;     
  creado_en: string;      
  usuario: string;        
  contrasena: string;     
  correo: string;         
  rol_id: number;         
  rol: Roles;             
}
