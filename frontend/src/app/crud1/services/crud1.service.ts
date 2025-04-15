import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class Crud1Service {
    private apiUrl = 'http://localhost:8000/api/usuarios/';

    constructor(private http: HttpClient) {}

    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            // Add CSRF token if needed
            // 'X-CSRFToken': this.getCsrfToken()
        });
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl, { headers: this.getHeaders() });
    }

    createUser(user: User): Observable<User> {
        console.log('Service: Sending create user request:', user);
        return this.http.post<User>(this.apiUrl, user, { headers: this.getHeaders() });
    }

    updateUser(user: User): Observable<User> {
        return this.http.put<User>(`${this.apiUrl}${user.id}/`, user, { headers: this.getHeaders() });
    }

    deleteUser(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}${id}/`, { headers: this.getHeaders() });
    }
}