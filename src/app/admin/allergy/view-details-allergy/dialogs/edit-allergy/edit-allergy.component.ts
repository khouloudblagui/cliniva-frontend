import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Allergy } from 'app/admin/allergy/model/allergy';
import { AllergyService } from 'app/admin/allergy/services/allergy.service';
import { SymptomService } from 'app/admin/allergy/services/symptoms.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Symptoms } from 'app/admin/allergy/model/symptoms';

@Component({
  selector: 'app-edit-allergy',
  templateUrl: './edit-allergy.component.html',
  styleUrls: ['./edit-allergy.component.scss']
})
export class EditAllergyComponent implements OnInit {
  allergyForm: FormGroup;
  allergy!: Allergy;
  allergyKy: any;
  symptoms: Symptoms[] = [];
  SymptomsNames: string[] = [];
  selectedsymptoms: Symptoms[] = []; // Ajoutez une propriété pour stocker les symptômes sélectionnés
  selectedSymptomName: string[] = [];

  constructor(
    private dialogRef: MatDialogRef<EditAllergyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { allergy: Allergy }, // Inject data
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private allergyservice: AllergyService,
    private symtomsservice: SymptomService
  ) {
    // Initialize form with data passed from parent component
    this.allergyForm = this.formBuilder.group({
      allergyName: [data.allergy.allergyName, Validators.required],
      allergyType: [data.allergy.allergyType, Validators.required],
      allergySeverity: [data.allergy.allergySeverity, Validators.required],
      //symptoms: [data.allergy.symptoms, Validators.required],
      description: [data.allergy.allergyDesc, Validators.required],
      symptoms: [data.allergy.symptoms, Validators.required],
    });
  }

  ngOnInit(): void {
  this.loadSymptomNames();
  console.log("Data passed from parent component:", this.data); // Vérifiez les données passées depuis le composant parent
  console.log("Selected symptoms from data:", this.data.allergy.symptoms); // Vérifiez les symptômes sélectionnés passés depuis le composant parent
  this.selectedsymptoms = this.data.allergy.symptoms; // Initialisation des symptômes sélectionnés
  console.log("Selected symptoms after initialization:", this.selectedsymptoms); // Vérifiez les symptômes sélectionnés après l'initialisation
}
 
  loadSymptomNames(): void {
    this.symtomsservice.getAllSymptoms().subscribe(
      (symptomsa: Symptoms[]) => {
        this.symptoms = symptomsa;
        this.SymptomsNames = symptomsa.map(effect => effect.symptomName);
      },
      (error) => {
        console.error('Error fetching symptoms:', error);
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
    onCancel(): void {
      this.dialogRef.close();
    }
    onSubmit() {
     if (this.allergyForm.valid) {
        const allergyName = this.allergyForm.get('allergyName');
        const allergyType = this.allergyForm.get('allergyType');
        const allergySeverity = this.allergyForm.get('allergySeverity');
        const symptoms = this.allergyForm.get('symptoms');
        const allergyDesc = this.allergyForm.get('description');
    //check if these variables are truthy before accessing their value property to avoid accessing properties of null
        if (allergyName && allergyType && allergySeverity &&
          symptoms && allergyDesc ) {
          const updatedVaccination: Allergy = {
            allergyName: allergyName.value,
            allergyType: allergyType.value,
            allergySeverity: allergySeverity.value,
            symptoms: symptoms.value,
            allergyDesc: allergyDesc.value,
            //sideEffects: sideEffectsControl.value,
            allergyKy: undefined
          };
          this.allergyservice.updateAllergy(updatedVaccination, this.data.allergy.allergyKy)
            .subscribe(
              () => {
                this.showNotification(
                  'snackbar-success',
                  ' Update allergy Successfully...!!!',
                  'bottom',
                  'center'
                );
                this.dialogRef.close();
              },
              (error) => {
                console.error('Error updating :', error);
                this.showNotification('error', 'Failed to update allergy', 'bottom', 'right');
              }
            );
        }
      } else {
        this.showNotification('snackbar-warning', 'Please fill all required fields', 'bottom', 'right');
      }
    }
  }
