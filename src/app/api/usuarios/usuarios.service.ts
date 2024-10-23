import { Injectable } from '@angular/core';
import { ApiConfigService } from '../api-config/api-config.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Usuarios } from 'src/app/models/Usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private readonly endpoint = 'usuarios'; // Nombre de la tabla en Supabase

  constructor(private apiService: ApiConfigService) { }
  
  obtenerUsuarios(): Observable<HttpResponse<Usuarios[]>> {
    const path = `${this.endpoint}?select=*,roles(nombre)`; 
    return this.apiService.get<Usuarios[]>(path);
  }

  actualizarRol(id: number, rol_id: number): Observable<HttpResponse<Usuarios>> {
    const url = `${this.endpoint}?id=eq.${id}`;
    return this.apiService.patch(url, { rol_id });
  }

}
