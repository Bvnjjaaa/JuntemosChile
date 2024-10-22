import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences'; // 
import { ToastController } from '@ionic/angular';
import { InscribirService } from 'src/app/api/inscribirVoluntario/inscribir-voluntario.service';



@Component({
  selector: 'app-reportes-inscritos',
  templateUrl: './reportes-inscritos.page.html',
  styleUrls: ['./reportes-inscritos.page.scss'],
})
export class ReportesInscritosPage implements OnInit {
  reportesInscritos: any[] = []; 


  constructor(
    private router: Router,
    private inscribirService: InscribirService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.cargarReportesInscritos();
  }

  async ionViewWillEnter() {
    await this.cargarReportesInscritos();
  }

  async cargarReportesInscritos() {
    const { value: id_voluntario } = await Preferences.get({ key: 'id' });

    if (!id_voluntario) {
        console.log("No se encuentra id de voluntario");
        return;
    }

    this.inscribirService.obtenerReportesInscritosConDetalles(+id_voluntario).subscribe(
        (response) => {
            console.log("Reportes inscritos con detalles:", response.body); // Accede a los datos aquí
            this.reportesInscritos = response.body; // Asigna el cuerpo de la respuesta a la variable
        },
        (error) => {
            console.error('Error al cargar los reportes inscritos:', error);
        }
    );
}

async desinscribirVoluntario(id_reporte: number) {
  const { value: id_voluntario } = await Preferences.get({ key: 'id' });

  if (!id_voluntario) {
    console.log("No se encuentra id de voluntario");
    return;
  }

  this.inscribirService.desinscribirVoluntario(id_reporte, +id_voluntario).subscribe(
    async (response) => {
      await this.presentToast("Te has desinscrito del reporte", "success");
      this.cargarReportesInscritos(); // Recarga la lista de reportes inscritos
    },
    async (error) => {
      console.error('Error al desinscribirte:', error);
      await this.presentToast("Hubo un error al desinscribirte. Inténtalo de nuevo", "danger");
    }
  );
}

  volver() {
    this.router.navigate(["/home"]);
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



  

}
