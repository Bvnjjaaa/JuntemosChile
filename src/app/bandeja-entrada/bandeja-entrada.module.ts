import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { BandejaEntradaPageRoutingModule } from './bandeja-entrada-routing.module';
import { BandejaEntradaPage } from './bandeja-entrada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BandejaEntradaPageRoutingModule
  ],
  declarations: [BandejaEntradaPage]
})
export class BandejaEntradaPageModule {}
