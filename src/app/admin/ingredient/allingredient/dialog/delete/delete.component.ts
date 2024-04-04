import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { IngredientService } from '../../ingredient.service';

export interface DialogData {

  ingredientName: string;
  ingredientDesc: string;

}

@Component({
  selector: 'app-delete:not(n)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public ingredientService: IngredientService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    //this.ingredientService.deleteIngredient(this.data.ingredient_ky);
  }
}
