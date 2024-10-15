import { Component } from '@angular/core';
import { RegisterServiceService } from 'src/app/api/register/register.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular'; // Importar ToastController
import { Usuarios } from 'src/app/models/Usuarios';
import { CrearUsuario } from 'src/app/models/CrearUsuario';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  
  usuarios: Usuarios[] = []; // Variable para almacenar la lista de reportes

  nuevoUsuario: CrearUsuario = {
    usuario: '',        
    contrasena: '',
    correo: ''
  };

  constructor(
    private registerService: RegisterServiceService,
    private router: Router,
    private toastController: ToastController // Inyectar ToastController
  ) {}

  crearUsuarios() {
    if (this.nuevoUsuario.usuario.trim() && this.nuevoUsuario.contrasena.trim() && this.nuevoUsuario.correo) {
      this.registerService.agregarUsuario(this.nuevoUsuario).subscribe(
        (response) => {
          console.log('Respuesta completa:', response); // Agrega esta línea
          if (response.body) {
            this.usuarios.push(response.body);  // Añadir el nuevo reporte a la lista
          } else {
            console.warn('No se recibió un body en la respuesta.');
            console.log('Reporte creado exitosamente:', response.body);
            this.nuevoUsuario = { usuario: '', contrasena: '', correo: ''};  // Limpiar el formulario
          }
        },
        (error) => {
          console.error('Error al crear el reporte:', error);
          if (error.error) {
            console.error('Detalles del error:', error.error);
          }
        }
      );
    } else {
      console.warn('El título y la descripción son obligatorios.');
    }
    }

  // Método para registrar usuarios
 // async register() {
 //    this.registerService.registerUser(this.email, this.contrasena).subscribe(
 //      async (response) => {
 //        await this.presentToast('Registro exitoso', 'success');
  //       this.router.navigate(['/login']); // Redirigir a la página de login
 //      },
 //      async (error) => {
 //        console.error('Error en el registro:', error);
//         await this.presentToast('Error en el registro: ' + error.message, 'danger');
 //      }
 //    );
}