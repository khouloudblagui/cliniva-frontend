import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Appointment } from './appointment.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class AppointmentService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'http://localhost:8087/api/doctor/appointments/';
  isTblLoading = true;
  dataChange: BehaviorSubject<Appointment[]> = new BehaviorSubject<Appointment[]>([]);
  dialogData!: Appointment;

  constructor(private httpClient: HttpClient) {
    super();
  }

  get data(): Appointment[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */

  // Récupérer tous les rendez-vous
  getAllAppointments(): Observable<Appointment[]> {
    return this.httpClient.get<Appointment[]>(this.API_URL).pipe(
      tap((data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      }),
      catchError((error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.error('Error fetching appointments:', error.message);
        throw error;
      })
    );
  }

  // Ajouter un rendez-vous
  addAppointment(appointment: Appointment): Observable<Appointment> {
    if (!appointment.name || !appointment.date || !appointment.time || !appointment.doctor) {
      console.error('Required fields are missing');
      return new Observable<Appointment>();
    }

    return this.httpClient.post<Appointment>(this.API_URL, appointment).pipe(
      tap((data) => {
        this.dialogData = data;
        this.dataChange.value.unshift(data);
        this.dataChange.next(this.dataChange.value);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error adding appointment:', error.message);
        throw error;
      })
    );
  }

  // Mettre à jour un rendez-vous existant
  updateAppointment(appointment: Appointment): Observable<Appointment> {
    return this.httpClient.put<Appointment>(`${this.API_URL}${appointment.id}`, appointment).pipe(
      tap((data) => {
        this.dialogData = data;
        const foundIndex = this.dataChange.value.findIndex((x) => x.id === data.id);
        if (foundIndex > -1) {
          this.dataChange.value[foundIndex] = data;
          this.dataChange.next(this.dataChange.value);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error updating appointment:', error.message);
        throw error;
      })
    );
  }

  // Supprimer un rendez-vous
  deleteAppointment(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}${id}`).pipe(
      tap(() => {
        const foundIndex = this.dataChange.value.findIndex((x) => x.id === id);
        if (foundIndex > -1) {
          this.dataChange.value.splice(foundIndex, 1);
          this.dataChange.next(this.dataChange.value);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error deleting appointment:', error.message);
        throw error;
      })
    );
  }
}
