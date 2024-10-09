// src/app/service/roles/roles.service.ts

import { Injectable } from '@angular/core';
import { ApiConfigService } from '../api-config/api-config.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Roles } from '../../models/Roles'; // Asegúrate de tener este modelo

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  
  private readonly endpoint = 'roles'; // Nombre de la tabla en Supabase

  constructor(private apiConfigService: ApiConfigService) { }

  // Método para obtener todos los roles
  obtenerRoles(): Observable<HttpResponse<Roles[]>> {
    return this.apiConfigService.get<Roles[]>(this.endpoint);
  }
  // Otros métodos para actualizar y eliminar roles pueden ir aquí
}