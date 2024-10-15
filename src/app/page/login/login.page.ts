import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../api/login/login.service';
import { ToastController } from '@ionic/angular'; // Importar ToastController

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  usuario: string = ''; // Campo para el nombre de usuario
  contrasena: string = ''; // Campo para la contraseña

  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastController: ToastController // Inyectar ToastController
  ) {}

  // Método para iniciar sesión
  login() {
    this.loginService.validateUser(this.usuario, this.contrasena).subscribe(
      async (response) => {
        if (response.body && response.body.length > 0) {
          console.log('Inicio de sesión exitoso', response.body[0]);
          await this.presentToast('Iniciaste sesion correctamente','success');
          // Redirigir al dashboard o a la página principal
          this.router.navigate(['/home']); // Ajusta la ruta según la página de destino
        } else {
          // Mostrar notificación de credenciales incorrectas
          await this.presentToast('Usuario o contraseña incorrectos', 'danger');
        }
      },
      async (error) => {
        console.error('Error al iniciar sesión:', error);
        await this.presentToast('Hubo un problema al iniciar sesión. Inténtalo de nuevo.','danger');
      }
    );
  }

  // Método para mostrar un Toast con el mensaje proporcionado
  async presentToast(message: string, color: string = 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
      color: color, // Puedes cambiar este valor para ajustar el color del toast
    });
    toast.present();
  }

  goToRegister() {
    this.router.navigate(['/register']);  // Aquí puedes redirigir a la página de registro
  }
}



