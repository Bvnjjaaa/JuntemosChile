import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../api/login/login.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  usuario: string = '';
  contrasena: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastController: ToastController
  ) {}

  login() {
    this.loginService.validateUser(this.usuario, this.contrasena).subscribe(
      async (response) => {
        if (response.body && response.body.length > 0) {
          console.log('Inicio de sesión exitoso', response.body[0]);
          await this.presentToast('Iniciaste sesión correctamente', 'success');
          // Almacenar el ID del usuario en localStorage
          const id = response.body[0].id;
          localStorage.setItem('id', id);
          // Redirigir al dashboard o a la página principal
          this.router.navigate(['/home']);
        } else {
          await this.presentToast('Usuario o contraseña incorrectos', 'danger');
        }
      },
      async (error) => {
        console.error('Error al iniciar sesión:', error);
        await this.presentToast('Hubo un problema al iniciar sesión. Inténtalo de nuevo.', 'danger');
      }
    );
  }

  async presentToast(message: string, color: string = 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
      color: color,
    });
    toast.present();
  }
}
