import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Allergy } from 'app/admin/allergy/model/allergy';

@Component({
  selector: 'app-delete-allergy',
  templateUrl: './delete-allergy.component.html',
  styleUrls: ['./delete-allergy.component.scss']
})
export class DeleteAllergyComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteAllergyComponent>,
    @Inject(MAT_DIALOG_DATA) public allergy: Allergy // Injecter les données dans le composant
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}