// Importaciones de angular
import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

// Importaciones propias
import { environment_DEVELOP } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // Inyección de servicios
  private readonly http = inject(HttpClient);
  readonly API_URL = environment_DEVELOP.API_URL;

  // Métodos
  // Método para realizar una petición GET
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.API_URL}/${endpoint}`, {
      // withCredentials: true,
    });
  }

  // Método para realizar una petición POST
  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.API_URL}/${endpoint}`, data, {
      // withCredentials: true,
    });
  }

  // Método para realizar una petición PUT
  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.API_URL}/${endpoint}`, data, {
      // withCredentials: true,
    });
  }

  // Método para realizar una petición DELETE
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.API_URL}/${endpoint}`, {
      // withCredentials: true,
    });
  }

  // Método para descargar CSV
  getFile(endpoint: string): Observable<HttpResponse<Blob>> {
    return this.http.get<Blob>(`${this.API_URL}/${endpoint}`, {
      responseType: 'blob' as 'json',
      observe: 'response',
      withCredentials: true,
    });
  }

  postFile(endpoint: string, data: any): Observable<HttpResponse<Blob>> {
    return this.http.post<Blob>(`${this.API_URL}/${endpoint}`, data, {
      responseType: 'blob' as 'json',
      observe: 'response',
      withCredentials: true,
    });
  }

  // Método para obtener la URL de la imagen
  getImg(filename: string | null): Observable<string | undefined> {
    return this.http.get(`${this.API_URL}/usuarios/images/${filename}`, {
      responseType: 'blob', // Espera recibir un archivo binario
      withCredentials: true,
    }).pipe(
      map((blob) => {
        return this.API_URL + '/usuarios/images/' + filename;
      }),
      catchError((error) => {
        return of(undefined);
      })
    );
  }

}
