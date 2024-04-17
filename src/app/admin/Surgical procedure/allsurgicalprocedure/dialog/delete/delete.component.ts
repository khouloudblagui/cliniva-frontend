import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { surgicalProcedureService } from '../../surgicalProcedure.service';
import { surgicalprocedure } from '../../surgicalprocedure.model';



@Component({
  selector: 'app-delete:not(f)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteDialogComponent {

  //cptky:number=0;
  constructor(

    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public surgical:surgicalprocedure
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }


  }


