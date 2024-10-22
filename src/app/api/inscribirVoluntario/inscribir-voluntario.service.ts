import { Injectable } from '@angular/core';
import { ApiConfigService } from '../api-config/api-config.service'; 
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InscribirService {

  private endpoint = 'reportes_inscritos'; 

  constructor(private apiService: ApiConfigService) {}

  inscribirVoluntario(id_reporte: number,id_voluntario: number): Observable<HttpResponse<any>>{
    const inscripcion = {id_reporte, id_voluntario};
    return this.apiService.post(this.endpoint, inscripcion);
  }

  verificarInscripcion(id_reporte: number, id_voluntario: number): Observable<HttpResponse<any>> {
    const path = `${this.endpoint}?id_reporte=eq.${id_reporte}&id_voluntario=eq.${id_voluntario}&select=*`;
    return this.apiService.get<any>(path);
 }

 obtenerReportesInscritosConDetalles(id_voluntario: number): Observable<HttpResponse<any>> {
  const path = `reportes_inscritos?select=*,reportes(*)&id_voluntario=eq.${id_voluntario}`;
  return this.apiService.get<any>(path);
}

desinscribirVoluntario(id_reporte: number, id_voluntario: number): Observable<HttpResponse<any>> {
  const path = `${this.endpoint}?id_reporte=eq.${id_reporte}&id_voluntario=eq.${id_voluntario}`;
  return this.apiService.delete(path);
}


}
