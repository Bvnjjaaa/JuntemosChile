import { Usuarios } from './Usuarios'; 

export interface Reportes {
  id_reporte: number;        // ID del reporte
  titulo: string;            // Título del reporte
  descripcion: string;       // Descripción del reporte
  creado_en: string;    // Fecha de creación del reporte
  ciudadano_id: number;      // ID del ciudadano que generó el reporte (de Usuarios)
  coordinador_id: number;    // ID del coordinador asociado al reporte (de Usuarios)
  ciudadano: Usuarios;        // Usuario ciudadano relacionado (ahora es obligatorio)
  coordinador: Usuarios;      // Usuario coordinador relacionado (ahora es obligatorio)
  estado: string;
}
