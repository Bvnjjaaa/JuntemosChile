import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { RolesService } from 'src/app/api/roles/roles.service';
import { UsuariosService } from 'src/app/api/usuarios/usuarios.service';
import { Usuarios } from 'src/app/models/Usuarios';

@Component({
  selector: 'app-cambiar-rol',
  templateUrl: './cambiar-rol.page.html',
  styleUrls: ['./cambiar-rol.page.scss'],
})
export class CambiarRolPage implements OnInit {
  usuarios: any[] = [];
  usuarioSeleccionado: Usuarios | null = null;

  constructor(
    private usuarioService: UsuariosService,
    private router: Router,
    private rolService: RolesService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe(
      (response) => {
        console.log(response.body);
        this.usuarios = response.body ?? [];

        // Asignar el nombre del rol basado en rol_id directamente
        this.usuarios.forEach(usuario => {
          switch (usuario.rol_id) {
            case 1:
              usuario.rolNombre = `Administrador (ID: ${usuario.rol_id})`;
              break;
            case 2:
              usuario.rolNombre = `Coordinador (ID: ${usuario.rol_id})`;
              break;
            case 3:
              usuario.rolNombre = `Ciudadano (ID: ${usuario.rol_id})`;
              break;
            case 4:
              usuario.rolNombre = `Voluntario (ID: ${usuario.rol_id})`;
              break;
            default:
              usuario.rolNombre = `Desconocido (ID: ${usuario.rol_id})`; // Por si acaso
          }
        });
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    );
  }

  toggleFormulario(usuario: Usuarios) {
    // Cambiar el usuario seleccionado y alternar la visibilidad del formulario
    if (this.usuarioSeleccionado === usuario) {
      this.usuarioSeleccionado = null; // Cerrar el formulario si el mismo usuario se selecciona
    } else {
      this.usuarioSeleccionado = usuario; // Abrir el formulario para el usuario seleccionado
    }
  }
  
  
  cambiarRol(id: number, nuevo_rol_id: number) {
    this.usuarioService.actualizarRol(id, nuevo_rol_id).subscribe(
      async (response) => {
        await this.presentToast("Rol actualizado correctamente", "success");
        // Recargar la lista de usuarios después de actualizar el rol
        this.cargarUsuarios();
        this.usuarioSeleccionado = null; // Cerrar el formulario después de actualizar
      },
      async (error) => {
        console.error('Error al actualizar el rol del usuario:', error);
        await this.presentToast("Hubo un error al actualizar el rol. Inténtalo de nuevo", "danger");
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
    await toast.present();
  }

  volver() {
    this.router.navigate(["/resumen-reportes"]);
  }
}
