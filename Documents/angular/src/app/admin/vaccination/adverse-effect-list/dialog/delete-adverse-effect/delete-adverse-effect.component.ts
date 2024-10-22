import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdverseEffect } from 'app/admin/vaccination/model/vaccination';

@Component({
  selector: 'app-delete-adverse-effect',
  templateUrl: './delete-adverse-effect.component.html',
  styleUrls: ['./delete-adverse-effect.component.scss']
})
export class DeleteAdverseEffectComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteAdverseEffectComponent>,
    @Inject(MAT_DIALOG_DATA) public vacination: AdverseEffect // Injecter les données dans le composant
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
