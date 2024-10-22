import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumenReportesPage } from './resumen-reportes.page';

const routes: Routes = [
  {
    path: '',
    component: ResumenReportesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumenReportesPageRoutingModule {}
