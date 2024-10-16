// solicitud-reportes.page.ts
import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../api/reportes/reportes.service';
import { Reportes } from '../../models/Reportes';
import { HttpResponse } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitud-reportes',
  templateUrl: './solicitud-reportes.page.html',
  styleUrls: ['./solicitud-reportes.page.scss'],
})
export class SolicitudReportesPage implements OnInit {
  reportesPendientes: Reportes[] = [];

  constructor( 
    private reportesService: ReportesService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarReportesPendientes();
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

  aceptarReporte(id_reporte: number) {
  const coordinador_id = localStorage.getItem('id'); // Obtén el ID del coordinador de localStorage
  if (coordinador_id) {
    this.reportesService.actualizarEstadoReporte(id_reporte, 'aceptado', Number(coordinador_id)).subscribe(
      async (response) => {
        console.log('Reporte aceptado:', response.body);
        this.cargarReportesPendientes();
        await this.presentToast("Reporte aceptado.", "success");
      },
      (error) => {
        console.error('Error al aceptar el reporte:', error);
      }
    );
  } else {
    console.error('No se encontró el ID del coordinador en localStorage');
  }
}

rechazarReporte(id_reporte: number) { 
  const coordinador_id = localStorage.getItem('id'); // Obtén el ID del coordinador de localStorage
  if (coordinador_id) {
    this.reportesService.actualizarEstadoReporte(id_reporte, 'rechazado', Number(coordinador_id)).subscribe( 
      async (response) => {
        console.log('Reporte rechazado:', response.body);
        this.cargarReportesPendientes();
        await this.presentToast("Reporte rechazado.", "danger");
      },
      (error) => {
        console.error('Error al rechazar el reporte:', error);
      }
    );
  } else {
    console.error('No se encontró el ID del coordinador en localStorage');
  }
}

  async presentToast(message: string, color: string = 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
      color: color,
    });
    toast.present();
  }

  volver(){
    this.router.navigate(["/home"]);
  }
}