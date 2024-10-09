import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../api/reportes/reportes.service';
import { Reportes } from '../../models/Reportes';
import { UsersService } from 'src/app/api/users/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  reportes: Reportes[] = []; // Variable para almacenar la lista de reportes

  constructor(private reportesService: ReportesService, private _usersService: UsersService) { }

  ngOnInit() {
    this.cargarReportes(); // Cargar la lista de reportes al iniciar la página
  }

  // Método para cargar los reportes desde Supabase
  cargarReportes() {
    this.reportesService.obtenerReportes().subscribe(
      (response) => {
        if (response.body) {
          this.reportes = response.body; // Asignar los reportes a la variable
        }
      },
      (error) => {
        console.error('Error al obtener los reportes:', error);
      }
    )
  }

  cerrarSesion() {
    const usuario = localStorage.getItem('usuarios'); // Recupera el ID del usuario desde el localStorage
    if (usuario) {
      this._usersService.cerrarSesion(String(usuario)); // Llama al método de cierre de sesión
    }
  }
}

