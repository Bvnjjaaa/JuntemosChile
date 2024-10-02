// src/app/service/reportes/reportes.service.ts

import { Injectable } from '@angular/core';
import { ApiConfigService } from '../api-config/api-config.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Reportes } from '../../models/Reportes';

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
}
