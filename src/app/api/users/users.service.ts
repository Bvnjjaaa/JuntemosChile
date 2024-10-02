import { Injectable } from '@angular/core';
import { ApiConfigService } from '../api-config/api-config.service'; // Asegúrate de importar correctamente
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuarios } from '../../models/Usuarios'; // Asegúrate de tener el modelo definido

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private apiConfigService: ApiConfigService) {}

  autenticar(usuario: string, contrasena: string): Observable<HttpResponse<Usuarios>> {
    const body = { usuario, contrasena };
    return this.apiConfigService.post<Usuarios>('/auth/login', body);
  }
}



