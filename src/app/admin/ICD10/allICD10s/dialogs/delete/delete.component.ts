import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ICD10Service } from '../../ICD10.service';

export interface DialogData {
  icd10ky : number;
  icd10Code: string;
  icd10Description: string;
  icd10Category: string;
}

@Component({
  selector: 'app-delete:not(f)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteDialogComponent {
  code:string='';
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public ICD10sService: ICD10Service
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(code: string): void {
    this.ICD10sService.deleteICD10(code).subscribe(
      () => {
        console.log('Suppression réussie.');
        // Rafraîchir la table ou effectuer d'autres actions nécessaires après la suppression
      },
      (error) => {
        console.error('Erreur lors de la suppression :', error);
        // Traiter l'erreur de suppression ici
      }
    );
  }
  
}
