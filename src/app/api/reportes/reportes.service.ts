import { Injectable } from '@angular/core';
import { ApiConfigService } from '../api-config/api-config.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Reportes } from '../../models/Reportes';
import { CrearReportes } from 'src/app/models/CrearReportes';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  
  private readonly endpoint = 'reportes'; // Nombre de la tabla en Supabase

  constructor(private apiConfigService: ApiConfigService) { }

  // Método para obtener todos los reportes
  obtenerReportes(): Observable<HttpResponse<Reportes[]>> {
    return this.apiConfigService.get<Reportes[]>(this.endpoint);
  }

  // Método para agregar nuevos reportes
  agregarReportes(nuevoReporte: CrearReportes): Observable<HttpResponse<Reportes>> {
    return this.apiConfigService.post(this.endpoint, nuevoReporte);
  }

  // Método para aceptar (aprobar) un reporte
  agregarReportesAprobados(reporte: Reportes): Observable<HttpResponse<Reportes>> {
    return this.apiConfigService.post('reportes-aprobados', reporte);
  }

  // Método para eliminar un reporte rechazado
  eliminarReporte(id: number): Observable<HttpResponse<any>> {
    return this.apiConfigService.post(`${this.endpoint}/delete`, { id });
  }
}
