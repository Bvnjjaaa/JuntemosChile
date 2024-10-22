import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/api/usuarios/usuarios.service';
import { Usuarios } from 'src/app/models/Usuarios';

@Component({
  selector: 'app-cambiar-rol',
  templateUrl: './cambiar-rol.page.html',
  styleUrls: ['./cambiar-rol.page.scss'],
})
export class CambiarRolPage implements OnInit {
  usuarios: Usuarios[] = [];

  constructor(
    private usuarioService: UsuariosService
  ) { }

  ngOnInit() {
  }

  cargarUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe(
      (response) => {
        this.usuarios = response.body;
      },
      (error) => {
        console.error('Error al obtener los reportes:', error);
      }
    );
  }

  /*async cambiarRol(id_usuario: number, nuevo_rol_id: number) {
    this.rolService.cambiarRolUsuario(id_usuario, nuevo_rol_id).subscribe(
      async (response) => {
        await this.presentToast("El rol del usuario ha sido actualizado correctamente", "success");
      },
      async (error) => {
        console.error('Error al actualizar el rol del usuario:', error);
        await this.presentToast("Hubo un error al actualizar el rol. Inténtalo de nuevo", "danger");
      }
    );
  }*/

}
