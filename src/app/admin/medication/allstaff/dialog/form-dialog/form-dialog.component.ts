import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MedicationService } from '../../medication.service';
import {
  UntypedFormGroup,FormGroup,FormBuilder,Validators
} from '@angular/forms';
import { Medication } from '../../medication.model';
import { MedicationResponse } from 'app/admin/medication/MedicationResponse';
import { Ingredient } from 'app/admin/ingredient/allingredient/ingredient.model';
import { IngredientService } from 'app/admin/ingredient/allingredient/ingredient.service';

export interface DialogData {
  medicationKy: number;
  medication: MedicationResponse;
}

@Component({
  selector: 'app-form-dialog:not(n)',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent implements OnInit {
  medicationForm!: FormGroup;
  ingredients: Ingredient[] = [];
  strengthOptions: string[] = [];
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

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private medicationService: MedicationService,
    private ingredientService: IngredientService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.medicationForm = this.createMedicationForm();
    this.fetchIngredients();
  }

  onTypeChange(): void {
    const selectedType = this.medicationForm.get('medicationType')?.value;
    if (selectedType) {
      this.strengthOptions = this.getStrengthOptions(selectedType);
      this.medicationForm.get('medicationStrength')?.setValue('');
    }
  }

  getMedicationTypeKeys() {
    return Object.keys(this.medicationTypes);
  }

  compareWithIngredients(option1: any, option2: any): boolean {
    return option1 && option2 && option1.ingredientName === option2.ingredientName;
  }

  createMedicationForm(): FormGroup {
    const initialMedication = this.data.medication;

    this.strengthOptions = this.getStrengthOptions(initialMedication.medicationType.toString());

    return this.fb.group({
      medicationCode: [initialMedication.medicationCode || '', Validators.required],
      medicationName: [initialMedication.medicationName || '', Validators.required],
      medicationType: [initialMedication.medicationType || '', Validators.required],
      medicationStrength: [initialMedication.medicationStrength || '', Validators.required],
      medicationDosageForm: [initialMedication.medicationDosageForm || '', Validators.required],
      ingredients: [initialMedication.ingredients, Validators.required],
    });
  }

  getStrengthOptions(medicationType: string): string[] {
    return this.medicationTypes[medicationType];
  }

  public fetchIngredients() {
    this.ingredientService.getAllIngredients().subscribe((res) => {
      console.log(res);
      this.ingredients = res;
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
  ingredientLinks:any = []
  onSubmit(): void {
    const updatedMedication = this.medicationForm.value;
   
    updatedMedication.ingredients.map((ing:any)=>{
      
        this.ingredients.map((item:any)=>{
          if((item.ingredientName == ing.ingredientName) && (item.ingredientDesc == ing.ingredientDesc)){
            this.ingredientLinks.push({ ing: { ingredientKy: item.ingredientKy } })
          }
        })
    })

  
    const updatedMedicationData = {
      medicationCode: updatedMedication.medicationCode,
      medicationName: updatedMedication.medicationName,
      medicationType: updatedMedication.medicationType,
      medicationStrength: updatedMedication.medicationStrength,
      medicationDosageForm: updatedMedication.medicationDosageForm,
      medicIngredientLinks: this.ingredientLinks 
    };
    console.log(updatedMedicationData)
    this.medicationService.checkIfMedicationExists(updatedMedication.medicationName,updatedMedicationData.medicationCode)
    .subscribe((exists:boolean) => {
      if(exists){
        alert('The Medication already exist');
      }else {
    this.medicationService
      .updateMedication(this.data.medicationKy, updatedMedicationData)
      .subscribe(
        (response) => {
          console.log('Medication updated successfully:', response);
          //alert('Medication updated successfully');
          this.ingredientLinks = []
          this.dialogRef.close(response);
        },
        (error) => {
          console.error('Error updating medication:', error);
          this.dialogRef.close(error);
        });
      }
    });
  }
}