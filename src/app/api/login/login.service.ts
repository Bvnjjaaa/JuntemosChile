import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfigService } from '../api-config/api-config.service'; // Asegúrate de importar tu servicio de configuración API
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private tableName = 'usuarios'; // Nombre de la tabla en Supabase

  constructor(private apiService: ApiConfigService) {}



  validateUser(usuario: string, contrasena: string): Observable<HttpResponse<any>> {
    // Modificar la consulta para incluir el nombre del rol usando un JOIN
    const path = `${this.tableName}?usuario=eq.${usuario}&contrasena=eq.${contrasena}&select=*,roles(nombre)`;
    
    // Realizar la consulta GET para validar las credenciales
    return this.apiService.get<any>(path);
  }

}
