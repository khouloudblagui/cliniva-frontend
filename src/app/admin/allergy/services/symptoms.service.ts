import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Symptoms } from '../model/symptoms';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SymptomService {
   isTblLoading= true;
  private apiServerUrl = 'http://localhost:8090';

  constructor(private http: HttpClient) { }

  getAllSymptoms(): Observable<Symptoms[]> {
    return this.http.get<Symptoms[]>(`${this.apiServerUrl}/symptoms/all`).pipe(
      map((data: Symptoms[]) => {
        // Traitez les données de la réponse HTTP ici et retournez le tableau de symptômes
        return data;
      })
    );
  }
  addSymptom(symptom: Symptoms): Observable<Symptoms> {
    return this.http.post<Symptoms>(`${this.apiServerUrl}/symptoms/add`, symptom);
  }

  removeSymptom(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/symptoms/remove/${id}`);
  }

  getSymptomById(id: number): Observable<Symptoms> {
    return this.http.get<Symptoms>(`${this.apiServerUrl}/symptoms/${id}`);
  }

  updateSymptom(symptomId: number, updatedSymptom: Symptoms): Observable<Symptoms> {
    return this.http.put<Symptoms>(`${this.apiServerUrl}/symptoms/update/${symptomId}`, updatedSymptom);
  }
  searchSymptoms(criteria: string): Observable<Symptoms[]> {
    const url = `${this.apiServerUrl}/symptoms/search?criteria=${criteria}`;
    return this.http.get<Symptoms[]>(url);
}

}