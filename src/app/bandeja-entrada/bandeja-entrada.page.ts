import { Component, OnInit } from '@angular/core';
import { ReportesService } from 'src/app/api/reportes/reportes.service';
import { Reportes } from 'src/app/models/Reportes';


@Component({
  selector: 'app-bandeja-entrada',
  templateUrl: './bandeja-entrada.page.html',
  styleUrls: ['./bandeja-entrada.page.scss'],
})
export class BandejaEntradaPage implements OnInit {
  reportes: Reportes[] = [];

  constructor(private reportesService: ReportesService) { }

  ngOnInit() {
    this.obtenerSolicitudes();
  }

  obtenerSolicitudes() {
    this.reportesService.obtenerReportes().subscribe(response => {
      this.reportes = response.body || []; // Cargar los reportes en la lista
    });
  }

  aceptarReporte(reporte: Reportes) {
    this.reportesService.agregarReportesAprobados(reporte).subscribe(() => {
      this.reportes = this.reportes.filter(r => r !== reporte); // Eliminar el reporte de la bandeja
      console.log('Reporte aceptado y publicado:', reporte);
    });
  }

  rechazarReporte(reporte: Reportes) {
    this.reportesService.eliminarReporte(reporte.id_reporte).subscribe(() => {
      this.reportes = this.reportes.filter(r => r !== reporte); // Eliminar el reporte de la bandeja
      console.log('Reporte rechazado:', reporte);
    });
  }
}
