import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { BioAnalysis } from 'app/admin/bioanalysis/model/bioanalysis';

@Component({
  selector: 'app-deletebioanalysis',
  templateUrl: './deletebioanalysis.component.html',
  styleUrls: ['./deletebioanalysis.component.scss']
})
export class DeletebioanalysisComponent {
  constructor(
    public dialogRef: MatDialogRef<DeletebioanalysisComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public bioanalys: BioAnalysis // Injecter les données dans le composant
  ) {}
  onCancelClick(): void {
    this.dialogRef.close();
  }
}





 

  
