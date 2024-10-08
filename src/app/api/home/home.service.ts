import { Injectable } from '@angular/core';
import { Reporte } from 'src/app/models/reporte';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private reportes: Reporte[] = [
    {
      usuario: "@bvnjjaaa",
      contexto: "Se requiere personal para retiro de escombros.",
      region: "Valparaiso",
      comuna: "Quilpué"

    },
    {
      usuario: "@nelsonme",
      contexto: "Se requieren alimentos perecibles para familia con casa impactada por incendio.",
      region: "Valparaiso",
      comuna: "Quilpué"
    }
  ]

  constructor() { }

  public obtener_lista_reportes(): Reporte[]{
    return this.reportes;
  }
}
