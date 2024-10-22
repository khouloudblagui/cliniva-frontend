import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Medication } from './medication.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Observable } from 'rxjs';
import { MedicationResponse } from '../MedicationResponse';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MedicationService  {
  private readonly API_URL = 'http://localhost:8090/medication';
  isTblLoading = true;
  //dataChange: BehaviorSubject<Medication[]> = new BehaviorSubject<Medication[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: MedicationResponse;
  constructor(private httpClient: HttpClient) {}
  /*get data(): Medication[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }*/
  /** CRUD METHODS */
  getAllMedications(): Observable<MedicationResponse[]> {
    return this.httpClient.get<MedicationResponse[]>(this.API_URL)

  }
   

  checkIfMedicationExists(medicationName: string, medicationCode: string): Observable<boolean> {
  return this.httpClient.get<boolean>(`${this.API_URL}/exists?medicationName=${medicationName}&medicationCode=${medicationCode}`);
  }
   
  addMedication(medication: MedicationResponse):void {
    this.dialogData= medication;
    this.httpClient.post(this.API_URL+'/add', medication)
    .subscribe({
      next:(data) => {
        this.dialogData= medication;
      },
      error:(error: HttpErrorResponse)=>{
        this.isTblLoading =false;
        console.log(error.name+' '+ error.message);
      },
    });
  }

  addMedicationFile(formData: FormData): Observable<any> {
 
    return this.httpClient.post(`${this.API_URL}/upload-data`, formData);
  }
  
  deleteMedication(medicationKy: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/delete/${medicationKy}`);
  }
  updateMedication(medicationKy: any, updatedMedication: any){
    return this.httpClient.put(`${this.API_URL}/edit/${medicationKy}`, updatedMedication);
  }

  searchMedication(medicationName: string): Observable<MedicationResponse[]> {
    return this.httpClient.get<MedicationResponse[]>(`${this.API_URL}/search/${medicationName}`);
  }
}
