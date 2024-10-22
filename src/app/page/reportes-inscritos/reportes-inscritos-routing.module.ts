import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportesInscritosPage } from './reportes-inscritos.page';

const routes: Routes = [
  {
    path: '',
    component: ReportesInscritosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportesInscritosPageRoutingModule {}
