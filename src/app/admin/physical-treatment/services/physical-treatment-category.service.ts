import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { PhysicalTreatmentCategory } from '../model/physical-treatment.category';


@Injectable({
  providedIn: 'root'
})
export class PhyTrCategoryService {
  isTblLoading= true;
  private apiServerUrl =  'http://localhost:8090';

  constructor(private http: HttpClient) { }

  getAllPhyTrCategories(): Observable<PhysicalTreatmentCategory[]> {
    return this.http.get<PhysicalTreatmentCategory[]>(`${this.apiServerUrl}/phycategories/all`);
  }

  getPhyTrCategoryById(id: number): Observable<PhysicalTreatmentCategory> {
    return this.http.get<PhysicalTreatmentCategory>(`${this.apiServerUrl}/phycategories/${id}`);
  }

  addPhyTrCategory(category: PhysicalTreatmentCategory): Observable<PhysicalTreatmentCategory> {
    return this.http.post<PhysicalTreatmentCategory>(`${this.apiServerUrl}/phycategories/add`, category);
  }

  updatePhyTrCategory(category: PhysicalTreatmentCategory): Observable<PhysicalTreatmentCategory> {
    return this.http.put<PhysicalTreatmentCategory>(`${this.apiServerUrl}/phycategories/update/${category.categoryid}`, category);
  }

  deletePhyTrCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/phycategories/delete/${id}`);
  }

  retrievePhyTrCategoryByCriteria(criteria: string): Observable<PhysicalTreatmentCategory[]> {
    return this.http.get<PhysicalTreatmentCategory[]>(`${this.apiServerUrl}/phycategories/search?criteria=${criteria}`);
  }
}
