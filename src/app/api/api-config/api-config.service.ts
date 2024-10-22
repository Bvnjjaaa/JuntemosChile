import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  baseUrl = environment.api_url; // Asegúrate de que tu URL base esté configurada en el archivo de entorno

  constructor(private http: HttpClient) { }

  // Configurar headers comunes
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'apiKey': environment.apiKey,
      'Authorization': "Bearer " + environment.apiKey
    });
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    console.error('Error ocurrido:', error);
    return throwError(() => error);
  }

  // Método GET genérico
  get<T>(path: string, params?: HttpParams): Observable<HttpResponse<T>> {
    return this.http.get<T>(`${this.baseUrl}/${path}`, { headers: this.getHeaders(), observe: 'response', params })
      .pipe(catchError(this.handleError));
  }

  // Método POST genérico
  post<T>(path: string, body: any): Observable<HttpResponse<T>> {
    return this.http.post<T>(`${this.baseUrl}/${path}`, body, { headers: this.getHeaders(), observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  // Método PATCH genérico
  patch<T>(url: string, body: any): Observable<HttpResponse<T>> {
    return this.http.patch<T>(`${this.baseUrl}/${url}`, body, { headers: this.getHeaders(), observe: 'response' })
      .pipe(catchError(this.handleError));
  }

  delete<T>(path: string): Observable<HttpResponse<T>> {
    return this.http.delete<T>(`${this.baseUrl}/${path}`, { headers: this.getHeaders(), observe: 'response' })
      .pipe(catchError(this.handleError));
  }

}
