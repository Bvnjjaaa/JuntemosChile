import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportesInscritosPageRoutingModule } from './reportes-inscritos-routing.module';

import { ReportesInscritosPage } from './reportes-inscritos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportesInscritosPageRoutingModule
  ],
  declarations: [ReportesInscritosPage]
})
export class ReportesInscritosPageModule {}
