import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ensamble } from '../models/ensamble.model';

@Injectable({
  providedIn: 'root'
})
export class EnsamblesService {
  private apiUrl = 'http://localhost:8000/api/ensambles/';

  constructor(private http: HttpClient) { }

  getEnsambles(): Observable<Ensamble[]> {
    return this.http.get<Ensamble[]>(this.apiUrl);
  }

  createEnsamble(ensamble: Ensamble): Observable<Ensamble> {
    return this.http.post<Ensamble>(this.apiUrl, ensamble);
  }

  updateEnsamble(ensamble: Ensamble): Observable<Ensamble> {
    return this.http.put<Ensamble>(`${this.apiUrl}${ensamble.id}/`, ensamble);
  }

  deleteEnsamble(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}