import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../api/reportes/reportes.service';
import { Reportes } from '../../models/Reportes';
import { CrearReportes } from '../../models/CrearReportes';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  reportes: Reportes[] = []; // Variable para almacenar la lista de reportes
  reportesPendientes: number = 0; // Variable para almacenar la cantidad de reportes pendientes
  
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
 crearReportes() {
  if (this.nuevoReporte.titulo.trim() && this.nuevoReporte.descripcion.trim()) {
    this.reportesService.agregarReportes(this.nuevoReporte).subscribe(
      (response) => {
        console.log('Respuesta completa:', response); // Agrega esta línea
        if (response.body) {
          this.reportes.push(response.body);  // Añadir el nuevo reporte a la lista
        } else {
          console.warn('No se recibió un body en la respuesta.');
          console.log('Reporte creado exitosamente:', response.body);
          this.nuevoReporte = { titulo: '', descripcion: '' };  // Limpiar el formulario
          this.mostrarFormulario = false;  // Ocultar el formulario después de crear el reporte
          this.cargarReportes();  // Recargar la lista de reportes
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

  // Método para alternar la visibilidad del formulario
  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }
}