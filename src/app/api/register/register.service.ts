import { Injectable } from '@angular/core';
import { ApiConfigService } from '../api-config/api-config.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Usuarios } from 'src/app/models/Usuarios';
import { CrearUsuario } from 'src/app/models/CrearUsuario';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  private readonly endpoint = 'usuarios'; // Nombre de la tabla en Supabase

  constructor(private apiService: ApiConfigService) { }

  agregarUsuario(nuevoUsuario: CrearUsuario): Observable<HttpResponse<Usuarios>> {
    return this.apiService.post(this.endpoint, nuevoUsuario);
  }
}