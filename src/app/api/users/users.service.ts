import { Injectable } from '@angular/core';
import { ApiConfigService } from '../api-config/api-config.service'; // Asegúrate de importar correctamente
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuarios } from 'src/app/models/Usuarios'; // Asegúrate de tener el modelo definido
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private apiConfigService: ApiConfigService, private router: Router) {}

  registrarUsuario(usuario: string, correo: string, contrasena: string): Observable<HttpResponse<Usuarios>> {
    const body = { usuario, correo, contrasena };
    return this.apiConfigService.post<Usuarios>('/auth/login', body)
  }

  autenticar(usuario: string, contrasena: string): Observable<HttpResponse<Usuarios>> {
    const body = { usuario, contrasena };
    return this.apiConfigService.post<Usuarios>('/auth/login', body);
  }
// Método para cerrar sesión
  cerrarSesion(usuario: string): void {
  // Cuerpo de la solicitud para cerrar sesión
    const body = { activo: false }; // Supón que 'activo' es el campo que marca si el usuario está conectado

  // Enviar una solicitud para actualizar el estado del usuario en la tabla 'usuarios'
    this.apiConfigService.put(`/usuarios/${usuario}`, body).subscribe(
      (HttpResponse) => {
        console.log('Sesión cerrada exitosamente', HttpResponse);
        // Eliminar cualquier información del usuario almacenada localmente
        localStorage.removeItem('usuarios'); // Elimina el ID del usuario de localStorage si es necesario
        this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
      },
      (error) => {
        console.error('Error al cerrar sesión:', error);
      }
  );
}
}



