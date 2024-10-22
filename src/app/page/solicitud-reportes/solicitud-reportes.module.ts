import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudReportesPageRoutingModule } from './solicitud-reportes-routing.module';

import { SolicitudReportesPage } from './solicitud-reportes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudReportesPageRoutingModule
  ],
  declarations: [SolicitudReportesPage]
})
export class SolicitudReportesPageModule {}
