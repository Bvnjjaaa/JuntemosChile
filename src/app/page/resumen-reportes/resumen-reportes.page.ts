import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../api/reportes/reportes.service';
import { Reportes } from '../../models/Reportes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resumen-reportes',
  templateUrl: './resumen-reportes.page.html',
  styleUrls: ['./resumen-reportes.page.scss'],
})
export class ResumenReportesPage implements OnInit {
  reportesAceptados: Reportes[] = [];
  reportesPendientes: Reportes[] = [];
  reportesRechazados: Reportes[] = [];
 


  constructor(
    private reportesService: ReportesService,
    private router: Router
    
  ) {}

  ngOnInit() {
    this.cargarReportesAceptados();
    this.cargarReportesPendientes();
    this.cargarReportesRechazados();
  }

  cargarReportesAceptados() {
    this.reportesService.obtenerReportes().subscribe(
      (response) => {
        if (response.body) {
          this.reportesAceptados = response.body.filter(reporte => reporte.estado === 'aceptado');
        }
      },
      (error) => {
        console.error('Error al obtener los reportes aceptados:', error);
      }
    );
  }

  cargarReportesPendientes() {
    this.reportesService.obtenerReportes().subscribe(
      (response) => {
        if (response.body) {
          this.reportesPendientes = response.body.filter(reporte => reporte.estado === 'pendiente');
        }
      },
      (error) => {
        console.error('Error al obtener los reportes pendientes:', error);
      }
    );
  }

  cargarReportesRechazados() {
    this.reportesService.obtenerReportes().subscribe(
      (response) => {
        if (response.body) {
          this.reportesRechazados = response.body.filter(reporte => reporte.estado === 'rechazado');
        }
      },
      (error) => {
        console.error('Error al obtener los reportes rechazados:', error);
      }
    );
  }

  volver(){
    this.router.navigate(["/home"]);
  }

  cambiarRoles(){
    this.router.navigate(["/cambiar-rol"]);
  }

}
