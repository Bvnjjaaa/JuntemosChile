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

  constructor(private apiConfigService: ApiConfigService) { }
  
  obtenerUsuarios(): Observable<HttpResponse<Usuarios[]>> {
    return this.apiConfigService.get<Usuarios[]>(this.endpoint);
  }

}
