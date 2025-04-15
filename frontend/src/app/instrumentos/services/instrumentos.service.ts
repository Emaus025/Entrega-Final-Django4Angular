import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Instrumento } from '../models/instrumento.model';

@Injectable({
  providedIn: 'root'
})
export class InstrumentosService {
  private apiUrl = 'http://localhost:8000/api/instrumentos/';

  constructor(private http: HttpClient) { }

  getInstrumentos(): Observable<Instrumento[]> {
    return this.http.get<Instrumento[]>(this.apiUrl);
  }

  createInstrumento(instrumento: Instrumento): Observable<Instrumento> {
    const formData = new FormData();
    formData.append('nombre', instrumento.nombre);
    formData.append('tipo', instrumento.tipo);
    if (instrumento.descripcion) {
      formData.append('descripcion', instrumento.descripcion);
    }
    if (instrumento.imagen instanceof File) {
      formData.append('imagen', instrumento.imagen);
    }
    return this.http.post<Instrumento>(this.apiUrl, formData);
  }

  updateInstrumento(instrumento: Instrumento): Observable<Instrumento> {
    const formData = new FormData();
    formData.append('nombre', instrumento.nombre);
    formData.append('tipo', instrumento.tipo);
    if (instrumento.descripcion) {
      formData.append('descripcion', instrumento.descripcion);
    }
    if (instrumento.imagen instanceof File) {
      formData.append('imagen', instrumento.imagen);
    }
    return this.http.put<Instrumento>(`${this.apiUrl}${instrumento.id}/`, formData);
  }

  deleteInstrumento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}