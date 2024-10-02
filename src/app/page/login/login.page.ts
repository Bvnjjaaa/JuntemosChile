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
  contrasena: string = '';

  constructor(private _usersLogin: UsersService, private router: Router) {}

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
}
