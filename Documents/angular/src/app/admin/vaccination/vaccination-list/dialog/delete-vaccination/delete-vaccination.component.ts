import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Vaccination } from 'app/admin/vaccination/model/vaccination';

@Component({
  selector: 'app-delete-vaccination',
  templateUrl: './delete-vaccination.component.html',
  styleUrls: ['./delete-vaccination.component.scss']
})
export class DeleteVaccinationComponent {
  
  constructor(
    public dialogRef: MatDialogRef<DeleteVaccinationComponent>,
    @Inject(MAT_DIALOG_DATA) public vacination: Vaccination // Injecter les données dans le composant
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
