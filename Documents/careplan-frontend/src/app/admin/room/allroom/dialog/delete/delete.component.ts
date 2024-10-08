import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { RoomService } from '../../room.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  id: number;
  rNo: string;
  pName: string;
  rType: string;
}

@Component({
  selector: 'app-delete:not(m)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private roomService: RoomService,
    private snackBar: MatSnackBar
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.roomService.deleteRoom(this.data.id);
    this.snackBar.open('Room deleted successfully', '', {
      duration: 2000,
    });
    this.dialogRef.close();
  }
}







/*export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public roomService: RoomService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.roomService.deleteRoom(this.data.id);
  }
}*/
