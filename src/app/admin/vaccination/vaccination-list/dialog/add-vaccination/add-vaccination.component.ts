import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MedicationResponse } from 'app/admin/medication/MedicationResponse';
import { AdverseEffect, ICD10, Medication, Vaccination } from 'app/admin/vaccination/model/vaccination';
import { AdverseEffectService } from 'app/admin/vaccination/services/adverse-effect.service';
import { VaccinationService } from 'app/admin/vaccination/services/vaccination.service';

@Component({
  selector: 'app-add-vaccination',
  templateUrl: './add-vaccination.component.html',
  styleUrls: ['./add-vaccination.component.scss']
})
export class AddVaccinationComponent implements OnInit{

  vaccinationForm: FormGroup;
  sideEffectsNames: string[] = []; // Propriété pour stocker les noms des symptômes
  selectedsideEffects: AdverseEffect[] = []; // Ajoutez une propriété pour stocker les symptômes sélectionnés
  selectedsideEffectsNames: string[] = []; // Tableau pour stocker les noms des symptômes sélectionnés
  medications: MedicationResponse[] = []; // Populate this with Medication objects
  icd10Codes: ICD10[] = []; // Populate this with ICD10 objects
  sideEffects: AdverseEffect[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddVaccinationComponent>,
    private vaccinationService: VaccinationService,
    private adverseEffectService: AdverseEffectService,
    private snackBar: MatSnackBar
  ) {
    this.vaccinationForm = this.formBuilder.group({
      vaccinationName: ['', Validators.required],
      vaccinationType: ['', Validators.required],
      Manufacturer: ['', Validators.required],
      vaccineMedication: ['', Validators.required],
      vaccineICD10Code: ['', Validators.required],
      SideEffects: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadMedications();
    this.loadICD10Codes();
    this.loadSymptomNames()
  }

  onSubmit(): void {
    if (this.vaccinationForm.valid) {
      // Collect form data
      const formData = this.vaccinationForm.value;  
      // Construct Vaccination object
      const vaccinationData: Vaccination = {
        idVaccination: null,
        vaccineLabel: formData.vaccinationName,
        vaccineType: formData.vaccinationType,
        vaccineManufacturer: formData.Manufacturer,
        vaccineMedication: formData.vaccineMedication,
        vaccineICD10Code: formData.vaccineICD10Code,
        sideEffects: this.selectedsideEffects   // Assign selected side effects
      };
  
      // Call vaccination service to create vaccination
      this.vaccinationService.createVaccination(vaccinationData).subscribe(
        (response) => {
          console.log('Vaccination created successfully:', response);
          // Optionally, display a success message or redirect the user
          this.dialogRef.close();
          this.showNotification(
          'snackbar-success',
          'Add Record Successfully...!!!',
          'bottom',
          'center'
        );
        },
        (error) => {
          console.error('Error creating vaccination:', error);
          // Optionally, display an error message
        }
      );
    } else {
      console.error('Form is invalid');
        this.showNotification('snackbar-warning', 'Please fill all required fields', 'bottom', 'right');
      // Optionally, display a validation error message
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  loadMedications(): void {
    this.vaccinationService.getMedication().subscribe((medications: MedicationResponse[]) => {
      this.medications = medications;
    });
  }

  loadICD10Codes(): void {
    this.vaccinationService.getICD10().subscribe((icd10Codes: ICD10[]) => {
      this.icd10Codes = icd10Codes;
    });
  }

  loadSymptomNames(): void {
    this.adverseEffectService.getSideEffects().subscribe(
      (data: AdverseEffect[]) => {
        this.sideEffectsNames = data.map(sideEffect => sideEffect.adverseEffectName);
        console.log('All sideEffect:', data); // Afficher tous les symptômes dans la console
      },
      (error) => {
        console.error('Error fetching symptoms:', error);
      }
    );
  }
  
  /*onSelectSideEffects(selectedsideEffects: string[]): void {
    console.log('Selected symptoms:', selectedsideEffects);
    console.log('All selected symptoms:', this.selectedsideEffects);
  
    selectedsideEffects.forEach(sideEffectName => {
      // Normaliser le nom du symptôme en minuscules pour une comparaison insensible à la casse
      const normalizedSideEffectName = sideEffectName.toLowerCase();
  
      // Recherchez le symptôme sélectionné dans la liste complète des symptômes
      this.vaccinationService.getSideEffects().subscribe(
        (adverseEffects: AdverseEffect[]) => {
          const selectedAdverseEffects = adverseEffects.find(adverseEffect => adverseEffect.adverseEffectName.toLowerCase() === normalizedSideEffectName);
          if (selectedAdverseEffects) {
            console.log('AdverseEffect Name:', selectedAdverseEffects.adverseEffectName);
            this.selectedsideEffects.push(selectedAdverseEffects); // Ajoutez le symptôme sélectionné à this.selectedSymptoms
          } else {
            console.error('AdverseEffect not found:', sideEffectName);
          }
        },
        (error) => {
          console.error('Error fetching AdverseEffects:', error);
        }
      );
    });
  }*/

  onSelectSideEffects(selectedsideEffects: string[]): void {
    selectedsideEffects.forEach(sideEffectName => {
      const normalizedSideEffectName = sideEffectName.toLowerCase();
      
      // Check if the side effect is already selected
      if (!this.selectedsideEffects.some(effect => effect.adverseEffectName.toLowerCase() === normalizedSideEffectName)) {
        // If not selected, fetch the side effect and add it
        this.adverseEffectService.getSideEffects().subscribe(
          (adverseEffects: AdverseEffect[]) => {
            const selectedAdverseEffect = adverseEffects.find(adverseEffect => adverseEffect.adverseEffectName.toLowerCase() === normalizedSideEffectName);
            if (selectedAdverseEffect) {
              this.selectedsideEffects.push(selectedAdverseEffect);
            } else {
              console.error('AdverseEffect not found:', sideEffectName);
            }
          },
          (error) => {
            console.error('Error fetching AdverseEffects:', error);
          }
        );
      }
    });
  }
  

  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
