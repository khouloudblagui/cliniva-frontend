import { Component ,Inject} from '@angular/core';
import { Symptoms } from 'app/admin/allergy/model/symptoms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-symtom',
  templateUrl: './delete-symtom.component.html',
  styleUrls: ['./delete-symtom.component.scss']
})
export class DeleteSymtomComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteSymtomComponent>,
    @Inject(MAT_DIALOG_DATA) public symptom: Symptoms // Injecter les données dans le composant
    
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}