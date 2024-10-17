import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../api/reportes/reportes.service';
import { Reportes } from '../../models/Reportes';
import { CrearReportes } from '../../models/CrearReportes';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';

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
  rol: string | null= "" ;

  constructor(
    private reportesService: ReportesService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarReportes();
    this.rol = localStorage.getItem('rol'); // Obtén el rol del usuario del localStorage
  }

  ionViewWillEnter() {
    this.cargarReportes(); // Carga los reportes cada vez que la página se vuelve a mostrar
    this.rol = localStorage.getItem('rol');
  }
  cargarReportes() {
    this.reportesService.obtenerReportes().subscribe(
      (response) => {
        if (response.body) {
          // Filtramos los reportes para que solo se muestren los que están en estado "aceptado"
          this.reportes = response.body.filter(reporte => reporte.estado === 'aceptado');
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
        async (response) => {
          console.log("Reporte creado:",response.body)
          this.nuevoReporte = {titulo: '',descripcion: '',ciudadano_id: '' };
          this.toggleFormulario();
          this.cargarReportes();
          await this.presentToast("Reporte creado, espere respuesta del coordinador.","success");
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

  cerrarSesion() {
    localStorage.removeItem('id');
    localStorage.removeItem('rol');
    this.router.navigate(['/login']);
  }

  buzonReportes(){
    this.router.navigate(["/solicitud-reportes"])
  }
}

