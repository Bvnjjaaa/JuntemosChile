import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../api/users/users.service'; // Cambia la ruta según corresponda
import { Usuarios } from '../../models/Usuarios';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  usuario: string = '';
  correo: string = '';
  contrasena: string = '';

  constructor(private _usersLogin: UsersService, private router: Router) {}

  register() {
    try {
      const response = this._usersLogin.registrarUsuario(this.usuario,this.correo ,this.contrasena);
      console.log('usuario registrado correctamente:', response);
      // Puedes redirigir a la página de login o hacer lo que necesites tras el registro
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      // Aquí puedes mostrar un mensaje al usuario si hay un error
    }
  }

  login() {
    this._usersLogin.autenticar(this.usuario, this.contrasena).subscribe(
      (response) => {
        // Asegúrate de que response sea de tipo HttpResponse<Usuarios>
        if (response.status === 200) {
          const user: Usuarios = response.body as Usuarios; // Asegúrate de que el tipo sea correcto
          console.log('Login exitoso', user);
          // Aquí puedes navegar a la página de inicio o hacer lo que necesites
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        console.error('Error de login', error);
        // Manejo del error (puedes mostrar un mensaje al usuario)
      }
    );
  }

  logOut() {
    this._usersLogin.cerrarSesion(this.usuario)
      this.router.navigate(['/login']);
  }
}
