import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { IngredientService } from '../../ingredient.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { Ingredient } from '../../ingredient.model';

export interface DialogData {
  ingredientKy: number;
  ingredient: Ingredient;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
  ingredientForm: FormGroup; 

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private ingredientService: IngredientService,
    private fb: FormBuilder 
  ) {
    this.ingredientForm = this.createIngredientForm(); 
  }

  createIngredientForm(): FormGroup {
    const initialIngredient = this.data.ingredient; 
    return this.fb.group({
      ingredientName: [initialIngredient.ingredientName || '', Validators.required], 
      ingredientDesc: [initialIngredient.ingredientDesc || '', Validators.required],
    });
  }
  

  onCancelClick(): void {
    this.dialogRef.close();
  }  

  onSubmit(): void {
    const updatedIngredient = this.ingredientForm.value; 
  
    this.ingredientService.checkIfIngredientExists(updatedIngredient.ingredientName)
      .subscribe((exists: boolean) => {
        if (exists) {
          alert('The ingredient already exists');
        } else {
          this.ingredientService.updateIngredient(this.data.ingredientKy, updatedIngredient)
            .subscribe(response => {
              console.log('Ingredient updated successfully :', response);
              alert('Ingredient updated successfully');
              this.dialogRef.close(response);
            }, error => {
              console.error('Error updating ingredient :', error);
            });
        }
      });
  }
}  
