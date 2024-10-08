import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Patient } from './patient.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
@Injectable()
export class PatientService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'http://localhost:8087/patients';
  isTblLoading = true;
  dataChange: BehaviorSubject<Patient[]> = new BehaviorSubject<Patient[]>([]);

  // Temporarily stores data from dialogs
  dialogData!: Patient;

  constructor(private httpClient: HttpClient) {
    super();
  }

  get data(): Patient[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllPatients(): void {
    this.subs.sink = this.httpClient.get<Patient[]>(this.API_URL).subscribe({
      next: (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      error: (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.error('Error fetching patients: ', error.message);
      },
    });
  }

  addPatient(patient: Patient): void {
    this.subs.sink = this.httpClient.post<Patient>(this.API_URL, patient).subscribe({
      next: (data) => {
        this.dialogData = data;
        // Optional: refresh the list
        this.getAllPatients();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error adding patient: ', error.message);
      },
    });
  }

  updatePatient(patient: Patient): void {
    this.subs.sink = this.httpClient.put<Patient>(`${this.API_URL}/${patient.id}`, patient).subscribe({
      next: (data) => {
        this.dialogData = data;
        // Optional: refresh the list
        this.getAllPatients();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error updating patient: ', error.message);
      },
    });
  }

  deletePatient(id: number): void {
    this.subs.sink = this.httpClient.delete(`${this.API_URL}/${id}`).subscribe({
      next: () => {
        console.log('Patient deleted successfully');
        // Optional: refresh the list
        this.getAllPatients();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error deleting patient: ', error.message);
      },
    });
  }
}
