import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-edit-ingredient',
  templateUrl: './edit-ingredient.component.html',
  styleUrls: ['./edit-ingredient.component.scss']
})
export class EditIngredientComponent {

  ingredientForm: UntypedFormGroup;
  formdata = {
    ingredientName: 'Pooja',
    ingredientDesc: 'Sarma',
  };
  constructor(private fb: UntypedFormBuilder) {
    this.ingredientForm = this.createContactForm();
  }
  onSubmit() {
    console.log('Form Value', this.ingredientForm.value);
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      ingredientName: [this.formdata.ingredientName,Validators.required],
      ingredientDesc: [this.formdata.ingredientDesc,Validators.required ],
      
    });
  }

}
