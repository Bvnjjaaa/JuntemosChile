import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../api/reportes/reportes.service';
import { Reportes } from '../../models/Reportes';
import { CrearReportes } from '../../models/CrearReportes';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  reportes: Reportes[] = []; // Variable para almacenar la lista de reportes
  
  nuevoReporte: CrearReportes = {
    titulo: '',
    descripcion: ''
  };

  mostrarFormulario: boolean = false;  // Estado para mostrar u ocultar el formulario

  constructor(private reportesService: ReportesService) {}

  ngOnInit() {
    this.cargarReportes();  // Cargar la lista de reportes al iniciar la página
  }

  // Método para cargar los reportes desde Supabase
  cargarReportes() {
    this.reportesService.obtenerReportes().subscribe(
      (response) => {
        if (response.body) {
          this.reportes = response.body;  // Asignar los reportes a la variable
        }
      },
      (error) => {
        console.error('Error al obtener los reportes:', error);
      }
    );
  }

  // Método para crear un nuevo reporte en Supabase
  async crearReportes() {
    try {
      const response = await firstValueFrom(this.reportesService.agregarReportes(this.nuevoReporte));
  
      if (response.body) {  // Verificar si `response.body` no es nulo
        this.reportes.push(response.body);  // Añadir el reporte a la lista
      } else {
        console.warn('No se recibió un body válido en la respuesta.');
      }
  
      this.nuevoReporte = { titulo: '', descripcion: '' };  // Limpiar el formulario
    } catch (error) {
      console.error('Error al crear el reporte:', error);
    }
  }
  
  
  
  
  

  
  // Método para alternar la visibilidad del formulario
  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }
}
