import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { IngredientService } from '../allingredient/ingredient.service';
import { Ingredient } from '../allingredient/ingredient.model'; 
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.scss'],
})
export class AddIngredientComponent {
  ingredientForm: UntypedFormGroup;
  
  hide3 = true;
  agree3 = false;

  constructor(private fb: UntypedFormBuilder, private ingredientService: IngredientService, private snackBar: MatSnackBar) {
    this.ingredientForm = this.fb.group({
      ingredientName: ['', [Validators.required]],
      ingredientDesc: ['', [Validators.required]],
    });
  }

  onSubmit() {
   
    const formData = this.ingredientForm.value;
    
    const newIngredient: Ingredient = {
      ingredientName: formData.ingredientName,
      ingredientDesc: formData.ingredientDesc
    };
    
    this.ingredientService.checkIfIngredientExists(newIngredient.ingredientName)
    .subscribe((exists:boolean)=>{
      if(exists){
      alert('The ingredient already exists');
      }else {
    this.ingredientService.addIngredient(newIngredient);
    console.log('Ingredient added successfully', newIngredient)
    alert('Ingredient added successfully');
    this.ingredientForm.reset();
  }
  });
}

  cancel() {
    this.ingredientForm.reset(); 
  }
}

