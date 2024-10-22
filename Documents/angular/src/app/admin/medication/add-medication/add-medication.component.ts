import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MedicationResponse } from '../MedicationResponse';
import { MedicationService } from '../allstaff/medication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-medication',
  templateUrl: './add-medication.component.html',
  styleUrls: ['./add-medication.component.scss'],
})
export class AddMedicationComponent implements OnInit {
  subscription!: Subscription;

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

  constructor(
    private fb: UntypedFormBuilder, private medicationService: MedicationService
  ) {
    this.medicationForm = this.fb.group({
      medicationCode: ['', [Validators.required]],
      medicationName: ['', [Validators.required]],
      medicationType: ['', [Validators.required]],
      medicationStrength: ['', [Validators.required]],
      medicationDosageForm: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onTypeChange(): void {
    const selectedType = this.medicationForm.get('medicationType')?.value;
    if (selectedType) {
      const availableStrengths = this.medicationTypes[selectedType];
      this.medicationForm.get('medicationStrength')?.setValue('');
      this.strengthOptions = availableStrengths;
    }
  }

  onSubmit(): void {
    const formData = this.medicationForm.value;
    const newMedication: MedicationResponse = {
      medicationCode: formData.medicationCode,
      medicationName: formData.medicationName,
      medicationType: formData.medicationType,
      medicationStrength: formData.medicationStrength,
      medicationDosageForm: formData.medicationDosageForm,
      ingredients: []
    };

    this.medicationService.checkIfMedicationExists(newMedication.medicationName, newMedication.medicationCode)
      .subscribe((exists: boolean) => {
        if (exists) {
          alert('The Medication already exists');
        } else {
          this.medicationService.addMedication(newMedication);
          console.log('Medication added successfully', newMedication);
          alert('Medication added successfully');
          this.medicationForm.reset();
        }
      });
  }

  cancel(): void {
    this.medicationForm.reset();
  }
}
