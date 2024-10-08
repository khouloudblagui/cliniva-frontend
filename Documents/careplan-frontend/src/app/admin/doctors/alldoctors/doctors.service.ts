import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Doctors } from './doctors.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Injectable()
export class DoctorsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'http://localhost:8087/doctors';
  isTblLoading = true;
  dataChange: BehaviorSubject<Doctors[]> = new BehaviorSubject<Doctors[]>([]);
  dialogData!: Doctors;

  constructor(private httpClient: HttpClient) {
    super();
  }

  get data(): Doctors[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllDoctors(): void {
    this.subs.sink = this.httpClient.get<Doctors[]>(this.API_URL).subscribe({
      next: (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      error: (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.error(error.name + ' ' + error.message);
      },
    });
  }


  getDoctorById(id: number): Observable<Doctors> {
    return this.httpClient.get<Doctors>(`${this.API_URL}/${id}`);
  }


  addDoctors(doctors: Doctors): void {
    this.subs.sink = this.httpClient.post<Doctors>(this.API_URL, doctors).subscribe({
      next: (data) => {
        this.dialogData = data;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error adding doctor:', error);
      },
    });
  }


  updateDoctors(id: number, doctors: Doctors): void {
    this.subs.sink = this.httpClient.put<Doctors>(`${this.API_URL}/${id}`, doctors).subscribe({
      next: (data) => {
        this.dialogData = data;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error updating doctor:', error);
      },
    });
  }


  deleteDoctors(id: number): void {
    this.subs.sink = this.httpClient.delete(`${this.API_URL}/${id}`).subscribe({
      next: () => {
        console.log(`Doctor with ID ${id} deleted`);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error deleting doctor:', error);
      },
    });
  }
}
