import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdverseEffect, ICD10, Medication, Vaccination } from '../model/vaccination';
import { environment } from 'environments/environment';
import { MedicationResponse } from 'app/admin/medication/MedicationResponse';

@Injectable({
  providedIn: 'root'
})
export class VaccinationService {
  isTblLoading = true;
  private apiServerUrl = 'http://localhost:8090';
  constructor(private http:HttpClient) { }

  // Vaccination List
  getVaccination(): Observable<Vaccination[]> {
    return this.http.get<Vaccination[]>(this.apiServerUrl+"/vaccination/all");
  }

  createVaccination(model:Vaccination): Observable<any>{
    return this.http.post(this.apiServerUrl+"/vaccination/add",model);
  }
  //delete vaccination
  removeVaccination(id:number): Observable<any>{
    return this.http.delete(this.apiServerUrl+"/vaccination/delete/"+id);
  }

  getVaccinationById(id:any){
    return this.http.get<Vaccination>(this.apiServerUrl+"/vaccination/search/"+id);
  }

  updateVaccination(model:Vaccination,id:number): Observable<any>{
    return this.http.put(this.apiServerUrl+"/vaccination/update/"+id,model);
  }
  
   // medication List
   getMedication(): Observable<MedicationResponse[]> {
    return this.http.get<MedicationResponse[]>(this.apiServerUrl+"/medication");
  }

  // ICD10 List
  getICD10(): Observable<ICD10[]> {
    return this.http.get<ICD10[]>(this.apiServerUrl+"/icd10/all");
  }


}
