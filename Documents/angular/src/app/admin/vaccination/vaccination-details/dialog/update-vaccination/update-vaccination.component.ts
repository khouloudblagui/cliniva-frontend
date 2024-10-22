import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AdverseEffect, ICD10, Medication, Vaccination } from 'app/admin/vaccination/model/vaccination';
import { AdverseEffectService } from 'app/admin/vaccination/services/adverse-effect.service';
import { VaccinationService } from 'app/admin/vaccination/services/vaccination.service';

@Component({
  selector: 'app-update-vaccination',
  templateUrl: './update-vaccination.component.html',
  styleUrls: ['./update-vaccination.component.scss']
})
export class UpdateVaccinationComponent implements OnInit {

  vaccinationForm: FormGroup;
  vaccination!: Vaccination;
  vaccinationId: any;
  medications!: Medication[];
  icd10Codes!: ICD10[];
  sideEffects: AdverseEffect[] = [];
  sideEffectsNames: string[] = [];
  selectedsideEffects: AdverseEffect[] = []; // Ajoutez une propriété pour stocker les symptômes sélectionnés
  selectedsideEffectsNames: string[] = [];

  constructor(
    private dialogRef: MatDialogRef<UpdateVaccinationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { vaccination: Vaccination }, // Inject data
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private vaccinationService: VaccinationService,
    private adverseEffectService: AdverseEffectService,

  ) {
    // Initialize form with data passed from parent component
    this.vaccinationForm = this.formBuilder.group({
      vaccinationName: [data.vaccination.vaccineLabel, Validators.required],
      vaccinationType: [data.vaccination.vaccineType, Validators.required],
      Manufacturer: [data.vaccination.vaccineManufacturer, Validators.required],
      vaccineMedication: [data.vaccination.vaccineMedication, Validators.required],
      vaccineICD10Code: [data.vaccination.vaccineICD10Code, Validators.required],
      sideEffects: [data.vaccination.sideEffects, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadMedications();
    this.loadICD10Codes();
    this.loadSymptomNames();
  }
  loadMedications(): void {
    this.vaccinationService.getMedication().subscribe((medications: Medication[]) => {
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
      (adverseEffects: AdverseEffect[]) => {
        this.sideEffects = adverseEffects;
        this.sideEffectsNames = adverseEffects.map(effect => effect.adverseEffectName);
      },
      (error) => {
        console.error('Error fetching adverse effects:', error);
      }
    );
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

  /*onSubmit() {
    if (this.vaccinationForm.valid) {
      const updatedVaccination: Vaccination = this.vaccinationForm.value;
      this.vaccinationService.updateVaccination(updatedVaccination, this.data.vaccination.idVaccination)
        .subscribe(
          () => {
            this.showNotification('success', 'Vaccination updated successfully', 'bottom', 'right');
            this.dialogRef.close();
          },
          (error) => {
            console.error('Error updating vaccination:', error);
            this.showNotification('error', 'Failed to update vaccination', 'bottom', 'right');
          }
        );
    } else {
      this.showNotification('warning', 'Please fill all required fields', 'bottom', 'right');
    }
  }*/

    onCancel(): void {
      this.dialogRef.close();
    }
    onSubmit() {
      if (this.vaccinationForm.valid) {
        const vaccinationNameControl = this.vaccinationForm.get('vaccinationName');
        const vaccinationTypeControl = this.vaccinationForm.get('vaccinationType');
        const manufacturerControl = this.vaccinationForm.get('Manufacturer');
        const vaccineMedicationControl = this.vaccinationForm.get('vaccineMedication');
        const vaccineICD10CodeControl = this.vaccinationForm.get('vaccineICD10Code');
        const sideEffectsControl = this.vaccinationForm.get('sideEffects');
    //check if these variables are truthy before accessing their value property to avoid accessing properties of null
        if (vaccinationNameControl && vaccinationTypeControl && manufacturerControl &&
            vaccineMedicationControl && vaccineICD10CodeControl && sideEffectsControl) {
          const updatedVaccination: Vaccination = {
            vaccineLabel: vaccinationNameControl.value,
            vaccineType: vaccinationTypeControl.value,
            vaccineManufacturer: manufacturerControl.value,
            vaccineMedication: vaccineMedicationControl.value,
            vaccineICD10Code: vaccineICD10CodeControl.value,
            sideEffects: sideEffectsControl.value,
            idVaccination: undefined
          };
    
          this.vaccinationService.updateVaccination(updatedVaccination, this.data.vaccination.idVaccination)
            .subscribe(
              () => {
                this.showNotification('snackbar-success', 'Vaccination updated successfully', 'bottom', 'center');
                this.dialogRef.close();
              },
              (error) => {
                console.error('Error updating vaccination:', error);
                this.showNotification('snackbar-error', 'Failed to update vaccination', 'bottom', 'center');
              }
            );
        }
      } else {
        this.showNotification('snackbar-warning', 'Please fill all required fields', 'bottom', 'right');
      }
    }
    

}
