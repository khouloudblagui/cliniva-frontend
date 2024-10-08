import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Room } from './room.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class RoomService {
  private readonly API_URL = 'http://localhost:8085/admin/operation-rooms'; // Port mis à jour à 8085
  isTblLoading = true;
  dataChange: BehaviorSubject<Room[]> = new BehaviorSubject<Room[]>([]);
  dialogData!: Room;

  constructor(private httpClient: HttpClient) {}

  get data(): Room[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */

  getAllRooms(): void {
    this.httpClient.get<Room[]>(this.API_URL).subscribe({
      next: (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      error: (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.error('Error fetching rooms:', error.message);
      },
    });
  }

  addRoom(room: Room): void {
    if (!room.roomNumber || !room.roomType) {
        console.error("Room number and type are required.");
        return;
    }

    this.httpClient.post<Room>(this.API_URL, room).subscribe({
        next: (data) => {
            this.dialogData = data;
            this.dataChange.value.push(data);
            this.dataChange.next(this.dataChange.value);
        },
        error: (error: HttpErrorResponse) => {
            console.error('Error adding room:', error.message);
        },
    });
}


  /*addRoom(room: Room): void {
    this.httpClient.post<Room>(this.API_URL, room).subscribe({
      next: (data) => {
        this.dialogData = data;
        this.dataChange.value.push(data);
        this.dataChange.next(this.dataChange.value);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error adding room:', error.message);
      },
    });
  }*/

  updateRoom(room: Room): void {
    this.httpClient.put(`${this.API_URL}/${room.id}`, room).subscribe({
      next: (data) => {
        this.dialogData = room;
        const index = this.dataChange.value.findIndex((r) => r.id === room.id);
        if (index !== -1) {
          this.dataChange.value[index] = room;
          this.dataChange.next(this.dataChange.value);
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error updating room:', error.message);
      },
    });
  }

  deleteRoom(id: number): void {
    this.httpClient.delete(`${this.API_URL}/${id}`).subscribe({
      next: () => {
        this.dataChange.next(this.dataChange.value.filter((r) => r.id !== id));
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error deleting room:', error.message);
      },
    });
  }
}
