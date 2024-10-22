import { Injectable } from '@angular/core';
import { ApiConfigService } from '../api-config/api-config.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Reportes } from '../../models/Reportes';

@Injectable({
  providedIn: 'root'
})
export class BandejaSolicitudesService {

  private readonly endpoint = 'reportes'; // Nombre de la tabla en Supabase

  constructor(private apiConfigService: ApiConfigService) { }

  // Método para obtener reportes pendientes
  obtenerReportesPendientes(): Observable<HttpResponse<Reportes[]>> {
    return this.apiConfigService.get<Reportes[]>(`${this.endpoint}?estado=pendiente`); // Asumiendo que tu API permite este tipo de filtrado
  }

  // Método para aceptar un reporte
  aceptarReporte(reporteId: string): Observable<HttpResponse<Reportes>> {
    return this.apiConfigService.post(`${this.endpoint}/${reporteId}/aceptar`, {}); // Lógica para aceptar el reporte
  }

  // Método para rechazar un reporte
  rechazarReporte(reporteId: string): Observable<HttpResponse<Reportes>> {
    return this.apiConfigService.post(`${this.endpoint}/${reporteId}/rechazar`, {}); // Lógica para rechazar el reporte
  }
}
