import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenReportesPageRoutingModule } from './resumen-reportes-routing.module';

import { ResumenReportesPage } from './resumen-reportes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResumenReportesPageRoutingModule
  ],
  declarations: [ResumenReportesPage]
})
export class ResumenReportesPageModule {}
