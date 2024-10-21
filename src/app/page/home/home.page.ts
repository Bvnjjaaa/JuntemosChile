import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../api/reportes/reportes.service';
import { Reportes } from '../../models/Reportes';
import { CrearReportes } from '../../models/CrearReportes';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

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
  rol: string | null = "";

  constructor(
    private reportesService: ReportesService,
    private toastController: ToastController,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.cargarReportes();
    const { value } = await Preferences.get({ key: 'rol' }); // Obtén el rol del usuario de Preferences
    this.rol = value;
  }

  async ionViewWillEnter() {
    await this.cargarReportes();
    const { value } = await Preferences.get({ key: 'rol' });
    this.rol = value;
  }
  
  cargarReportes() {
    this.reportesService.obtenerReportes().subscribe(
      (response) => {
        if (response.body) {
          this.reportes = response.body.filter(reporte => reporte.estado === 'aceptado');
        }
      },
      (error) => {
        console.error('Error al obtener los reportes:', error);
      }
    );
  }
  

  async crearReportes() {
    const { titulo, descripcion } = this.nuevoReporte;
    
    if (titulo.trim() && descripcion.trim()) {
      const { value: ciudadano_id } = await Preferences.get({ key: 'id' }); // Obtén el ID del ciudadano de Preferences
  
      if (ciudadano_id) {
        this.nuevoReporte.ciudadano_id = ciudadano_id;
      } else {
        console.error('No se encontró el ID del ciudadano en Preferences');
        return;
      }
  
      this.reportesService.agregarReportes(this.nuevoReporte).subscribe(
        async (response) => {
          this.nuevoReporte = { titulo: '', descripcion: '', ciudadano_id: '' };
          this.toggleFormulario();
          await this.cargarReportes();
          await this.presentToast("Reporte creado, espere respuesta del coordinador.", "success");
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

  async presentToast(message: string, color: string = 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
      color: color,
    });
    toast.present();
  }

  async cerrarSesion() {
    await Preferences.remove({ key: 'id' });
    await Preferences.remove({ key: 'rol' });
    this.router.navigate(['/login']);
  }

  buzonReportes() {
    this.router.navigate(["/solicitud-reportes"]);
  }

  resumenReportes() {
    this.router.navigate(["/resumen-reportes"]);
  }
}
