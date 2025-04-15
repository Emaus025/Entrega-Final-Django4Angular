import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Partitura } from '../models/partitura.model';

@Injectable({
  providedIn: 'root'
})
export class PartiturasService {
  private apiUrl = 'http://localhost:8000/api/partituras/';

  constructor(private http: HttpClient) { }

  getPartituras(): Observable<Partitura[]> {
    return this.http.get<Partitura[]>(this.apiUrl);
  }

  createPartitura(partitura: Partitura): Observable<Partitura> {
    const formData = new FormData();
    formData.append('titulo', partitura.titulo);
    formData.append('compositor', partitura.compositor);
    formData.append('dificultad', partitura.dificultad);
    if (partitura.descripcion) {
      formData.append('descripcion', partitura.descripcion);
    }
    if (partitura.archivo_pdf instanceof File) {
      formData.append('archivo_pdf', partitura.archivo_pdf);
    }
    if (partitura.instrumentos) {
      partitura.instrumentos.forEach(instrumento => {
        formData.append('instrumentos', instrumento.toString());
      });
    }
    if (partitura.ensamble) {
      formData.append('ensamble', partitura.ensamble.toString());
    }
    return this.http.post<Partitura>(this.apiUrl, formData);
  }

  updatePartitura(partitura: Partitura): Observable<Partitura> {
    const formData = new FormData();
    formData.append('titulo', partitura.titulo);
    formData.append('compositor', partitura.compositor);
    formData.append('dificultad', partitura.dificultad);
    if (partitura.descripcion) {
      formData.append('descripcion', partitura.descripcion);
    }
    if (partitura.archivo_pdf instanceof File) {
      formData.append('archivo_pdf', partitura.archivo_pdf);
    }
    if (partitura.instrumentos) {
      partitura.instrumentos.forEach(instrumento => {
        formData.append('instrumentos', instrumento.toString());
      });
    }
    if (partitura.ensamble) {
      formData.append('ensamble', partitura.ensamble.toString());
    }
    return this.http.put<Partitura>(`${this.apiUrl}${partitura.id}/`, formData);
  }

  deletePartitura(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}