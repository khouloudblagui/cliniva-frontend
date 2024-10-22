import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PhysicalTreatment } from '../model/physical-treatment';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PhyTreatmentService {
    isTblLoading= true;
  private apiServerUrl = 'http://localhost:8090';

  constructor(private http: HttpClient) { }

  getAllTreatments(): Observable<PhysicalTreatment[]> {
    return this.http.get<PhysicalTreatment[]>(`${this.apiServerUrl}/phytreatments/all`);
  }

  getTreatmentById(id: number): Observable<PhysicalTreatment> {
    return this.http.get<PhysicalTreatment>(`${this.apiServerUrl}/phytreatments/${id}`);
  }

  saveTreatment(treatment: PhysicalTreatment): Observable<PhysicalTreatment> {
    return this.http.post<PhysicalTreatment>(`${this.apiServerUrl}/phytreatments/add`, treatment);
  }

  updateTreatment(id: number, treatment: PhysicalTreatment): Observable<PhysicalTreatment> {
    return this.http.put<PhysicalTreatment>(`${this.apiServerUrl}/phytreatments/update/${id}`, treatment);
  }
  

  deleteTreatment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/phytreatments/delete/${id}`);
  }

  searchPhyTreatmentByCriteria(criteria: string): Observable<PhysicalTreatment[]> {
    return this.http.get<PhysicalTreatment[]>(`${this.apiServerUrl}/phytreatments/search?criteria=${criteria}`);
  }
}
