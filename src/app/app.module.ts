import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http'; // Asegúrate de importar HttpClientModule para hacer peticiones HTTP

// Importa todos los servicios que uses
import { ReportesService } from './api/reportes/reportes.service';
import { ApiConfigService } from './api/api-config/api-config.service';
import { LoginService } from './api/login/login.service';
import { RolesService } from './api/roles/roles.service';


@NgModule({
  declarations: [AppComponent], // Declara el componente principal (AppComponent)
  imports: [
    BrowserModule,              // El módulo principal de Angular para aplicaciones web
    IonicModule.forRoot(),       // Configura Ionic para toda la aplicación
    AppRoutingModule,            // Configura las rutas de la aplicación
    HttpClientModule             // Importa el módulo para hacer peticiones HTTP
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, // Estrategia de enrutamiento de Ionic
    ReportesService,              // Servicios a utilizar en toda la aplicación
    ApiConfigService,
    LoginService,
    RolesService
  ],
  bootstrap: [AppComponent], // Componente inicial (bootstrap)
})
export class AppModule {}
