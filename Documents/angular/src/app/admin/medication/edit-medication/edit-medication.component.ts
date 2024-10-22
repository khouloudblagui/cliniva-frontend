import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-edit-medication',
  templateUrl: './edit-medication.component.html',
  styleUrls: ['./edit-medication.component.scss'],
})
export class EditMedicationComponent {
  strengthOptions: string[] = [];
  medicationForm: UntypedFormGroup;
  medicationTypes: { [key: string]: string[] } = {
    OINTMENT: [
      'STRENGTH_1_PERCENT',
      'STRENGTH_2_PERCENT',
      'STRENGTH_5_PERCENT',
      'STRENGTH_10_PERCENT',
    ],
    SOFT_CAPSULE: [
      'STRENGTH_5MG_PER_ML',
      'STRENGTH_10MG_PER_ML',
      'STRENGTH_20MG_PER_ML',
      'STRENGTH_50MG_PER_ML',
      'STRENGTH_100MG_PER_ML',
    ],
    FILM_COATED_TABLET: [
      'STRENGTH_50MG',
      'STRENGTH_100MG',
      'STRENGTH_250MG',
      'STRENGTH_500MG',
      'STRENGTH_1000MG',
    ],
  };
  formdata = {
    medication_code: 'MED080',
    medication_name: 'FERVEX',
    medication_type: 'OINTMENT',
    medication_strength: 'STRENGTH_1_PERCENT',
    medication_dosage_form: 'ORAL',
    MedicIngredientLinks: '',
   
  };
  constructor(private fb: UntypedFormBuilder) {
    this.medicationForm = this.createContactForm();
  }
  
  onTypeChange() {
    const selectedType = this.medicationForm.get('medication_type')?.value;
    if (selectedType) {
      const availableStrengths = this.medicationTypes[selectedType];
      this.medicationForm.get('medication_strength')?.setValue('');
      this.strengthOptions = availableStrengths;
    }
  }
  
  onSubmit() {
    console.log('Form Value', this.medicationForm.value);
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
    
      medication_code: [this.formdata.medication_code, [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      medication_name: [this.formdata.medication_name, [Validators.required]],
      medication_type: [this.formdata.medication_strength, [Validators.required]],
      medication_strength: [this.formdata.medication_strength, [Validators.required]],
      medication_dosage_form: [this.formdata.medication_dosage_form, [Validators.required]],
      MedicIngredientLinks: [this.formdata.MedicIngredientLinks, [Validators.required]],
    });
  }
}
