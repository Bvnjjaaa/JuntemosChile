import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/api/login/login.service';
import { Usuarios } from 'src/app/models/Usuarios';
import { ToastController } from '@ionic/angular';
import { Roles } from 'src/app/models/Roles';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.page.html',
  styleUrls: ['./lista-usuarios.page.scss'],
})
export class ListaUsuariosPage implements OnInit {
  usuarios: Usuarios[] = [];
  constructor(
    private loginService: LoginService,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarListaUsuarios('', '', +'');
  }

  cargarListaUsuarios(usuario: string, correo: string, id_rol: number) {
    // Método que pasa el filtro de usuario y correo al servicio
    this.loginService.listaUsuarios(usuario, correo, id_rol).subscribe({
      next: (response) => {
        console.log('Usuarios con roles:', response);
        this.usuarios = response.body || []; // Guarda los usuarios en el array
      },
      error: (error) => {
        console.error('Error al cargar los usuarios:', error);
      }
    });
  }

  /*async cambiarRol(id_usuario: number, nuevo_rol_id: number) {
    this.loginService.cambiarRolUsuario(id_usuario, nuevo_rol_id).subscribe(
      async (response) => {
        await this.presentToast("El rol del usuario ha sido actualizado correctamente");
      },
      async (error) => {
        console.error('Error al actualizar el rol del usuario:', error);
        await this.presentToast("Hubo un error al actualizar el rol. Inténtalo de nuevo");
      }
    );
}*/

 /* async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // Duración en milisegundos
      position: 'bottom' // Posición del Toast (puede ser top, middle o bottom)
    });
    await toast.present();
  }*/

  /*cambiarRol() {
    this.loginService.cambiarRolUsuario(+'', +'').subscribe(
      (response) => {
        console.log('Rol cambiado exitosamente:', response);
      },
      (error) => {
        console.error('Error al cambiar el rol:', error);
      }
    );
  }*/
  
    cambiarRol(usuario: string, nuevoRol: number) {
      this.loginService.cambiarRolUsuario(usuario, nuevoRol).subscribe(
        (response) => {
          this.presentToast("Rol cambiado exitosamente.");
          this.cargarListaUsuarios(usuario); // Refresca la lista de usuarios
        },
        (error) => {
          console.error("Error al cambiar rol:", error);
          this.presentToast("Error al cambiar el rol.");
        }
      );
    }

    async presentToast(message: string) {
      const toast = await this.toastController.create({
        message: message,
        duration: 2000, // Duración en milisegundos
        position: 'bottom' // Posición del Toast (puede ser top, middle o bottom)
      });
      await toast.present();
    }

  volver(){
    this.router.navigate(["/home"]);
  }
}
