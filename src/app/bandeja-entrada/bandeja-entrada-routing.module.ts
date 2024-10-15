import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BandejaEntradaPage } from './bandeja-entrada.page';

const routes: Routes = [
  {
    path: '',
    component: BandejaEntradaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BandejaEntradaPageRoutingModule {}
