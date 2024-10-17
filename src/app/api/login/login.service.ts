import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfigService } from '../api-config/api-config.service'; // Asegúrate de importar tu servicio de configuración API
import { HttpResponse } from '@angular/common/http';
import { CrearUsuario } from 'src/app/models/CrearUsuario';
import { Usuarios } from 'src/app/models/Usuarios';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private endpoint = 'usuarios'; // Nombre de la tabla en Supabase

  constructor(private apiService: ApiConfigService) {}



  validateUser(usuario: string, contrasena: string): Observable<HttpResponse<any>> {
    const path = `${this.endpoint}?usuario=eq.${usuario}&contrasena=eq.${contrasena}&select=*,roles(nombre)`;
    return this.apiService.get<any>(path);
  }

  validarCrearUsuario(usuario: string, correo: string): Observable<HttpResponse<any>> {
    const path = `${this.endpoint}?or=(usuario.eq.${usuario},correo.eq.${correo})`;
    return this.apiService.get<any>(path);
  }

  agregarUsuario(nuevoUsuario: CrearUsuario): Observable<HttpResponse<Usuarios>> {
    return this.apiService.post(this.endpoint, nuevoUsuario);
  }
}


