import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../api/reportes/reportes.service';
import { Reportes } from '../../models/Reportes';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences'; // 

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

  async aceptarReporte(id_reporte: number) {
    const { value: coordinador_id } = await Preferences.get({ key: 'id' }); // Obtener ID del coordinador de Preferences
    if (coordinador_id) {
      this.reportesService.actualizarEstadoReporte(id_reporte, 'aceptado', Number(coordinador_id)).subscribe(
        async (response) => {
          this.cargarReportesPendientes();
          await this.presentToast("Reporte aceptado.", "success");
        },
        (error) => {
          console.error('Error al aceptar el reporte:', error);
        }
      );
    } else {
      console.error('No se encontró el ID del coordinador en Preferences');
    }
  }

  async rechazarReporte(id_reporte: number) {
    const { value: coordinador_id } = await Preferences.get({ key: 'id' }); // Obtener ID del coordinador de Preferences
    if (coordinador_id) {
      this.reportesService.actualizarEstadoReporte(id_reporte, 'rechazado', Number(coordinador_id)).subscribe(
        async (response) => {
          this.cargarReportesPendientes();
          await this.presentToast("Reporte rechazado.", "danger");
        },
        (error) => {
          console.error('Error al rechazar el reporte:', error);
        }
      );
    } else {
      console.error('No se encontró el ID del coordinador en Preferences');
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

  volver() {
    this.router.navigate(["/home"]);
  }
}
