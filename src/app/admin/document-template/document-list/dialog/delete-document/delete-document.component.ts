import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocTemp } from 'app/admin/document-template/model/DocTemp';

@Component({
  selector: 'app-delete-document',
  templateUrl: './delete-document.component.html',
  styleUrls: ['./delete-document.component.scss']
})
export class DeleteDocumentComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDocumentComponent>,
    @Inject(MAT_DIALOG_DATA) public vacination: DocTemp // Injecter les données dans le composant
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
