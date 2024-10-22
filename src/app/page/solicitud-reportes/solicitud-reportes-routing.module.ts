import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitudReportesPage } from './solicitud-reportes.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitudReportesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitudReportesPageRoutingModule {}
