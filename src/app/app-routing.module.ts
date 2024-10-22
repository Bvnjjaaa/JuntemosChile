import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./page/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./page/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },  {
    path: 'solicitud-reportes',
    loadChildren: () => import('./page/solicitud-reportes/solicitud-reportes.module').then( m => m.SolicitudReportesPageModule)
  },
  {
    path: 'resumen-reportes',
    loadChildren: () => import('./page/resumen-reportes/resumen-reportes.module').then( m => m.ResumenReportesPageModule)
  },
  {
    path: 'reportes-inscritos',
    loadChildren: () => import('./page/reportes-inscritos/reportes-inscritos.module').then( m => m.ReportesInscritosPageModule)
  },
  {
    path: 'cambiar-rol',
    loadChildren: () => import('./page/cambiar-rol/cambiar-rol.module').then( m => m.CambiarRolPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
