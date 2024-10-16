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
  reportes: Reportes[] = [];
  

  nuevoReporte: CrearReportes = {
    titulo: '',
    descripcion: '',
    ciudadano_id: ''
  };

  mostrarFormulario: boolean = false;

  constructor(private reportesService: ReportesService) {}

  ngOnInit() {
    this.cargarReportes();
  }

  cargarReportes() {
    this.reportesService.obtenerReportes().subscribe(
      (response) => {
        if (response.body) {
          this.reportes = response.body;
        }
      },
      (error) => {
        console.error('Error al obtener los reportes:', error);
      }
    );
  }

  crearReportes() {
    const { titulo, descripcion } = this.nuevoReporte;
    
    // Validamos que título y descripción no estén vacíos
    if (titulo.trim() && descripcion.trim()) {
      const ciudadano_id = localStorage.getItem('id');
  
      // Verificamos que ciudadano_id esté disponible
      if (ciudadano_id) {
        this.nuevoReporte.ciudadano_id = ciudadano_id;
      } else {
        console.error('No se encontró el ID del ciudadano en localStorage');
        return;
      }
  
      this.reportesService.agregarReportes(this.nuevoReporte).subscribe(
        (response) => {
          if (response.body) {
            this.reportes.push(response.body);
            console.log("hola");
          }
          this.nuevoReporte = {
            titulo: '',descripcion: '',ciudadano_id: ''
          };
          this.toggleFormulario();
          this.cargarReportes();
        },
        (error) => console.error('Error al crear el reporte:', error)
      );
    } else {
      console.warn('El título y la descripción son obligatorios.');
    }
  }
  

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }
}
