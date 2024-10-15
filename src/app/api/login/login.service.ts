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

  /**
   * Método para validar usuario y contraseña
   * @param usuario Nombre de usuario
   * @param contrasena Contraseña
   * @returns Observable con la respuesta de la consulta
   */
  validateUser(usuario: string, contrasena: string): Observable<HttpResponse<any>> {
    // Construcción de la ruta con parámetros de filtro en Supabase
    const path = `${this.tableName}?usuario=eq.${usuario}&contrasena=eq.${contrasena}`;

    // Realizar la consulta GET para validar las credenciales
    return this.apiService.get<any>(path);
  }
}
