import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiURL = 'http://localhost:8089/doctor'; // URL du backend pour les docteurs

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer tous les docteurs
  getDoctors(): Observable<any> {
    return this.http.get(`${this.apiURL}/doctors`);
  }

  // Méthode pour récupérer un docteur spécifique par son ID
  getDoctorById(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}/doctors/${id}`);
  }
}
