import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Allergy } from 'app/admin/allergy/model/allergy';
import { Symptoms } from 'app/admin/allergy/model/symptoms';
import { AllergyService } from 'app/admin/allergy/services/allergy.service';
import { SymptomService } from 'app/admin/allergy/services/symptoms.service';
@Component({
  selector: 'app-add-allergy',
  templateUrl: './add-allergy.component.html',
  styleUrls: ['./add-allergy.component.scss']
})
export class AddAllergyComponent {
  allergyForm: FormGroup;
  symptomNames: string[] = []; // Propriété pour stocker les noms des symptômes
  selectedSymptoms: Symptoms[] = []; // Ajoutez une propriété pour stocker les symptômes sélectionnés
  selectedSymptomNames: string[] = []; // Tableau pour stocker les noms des symptômes sélectionnés
  


  constructor(
    private formBuilder: FormBuilder,
    private allergyService: AllergyService,
    private symptomService: SymptomService,
    public dialogRef: MatDialogRef<AddAllergyComponent>,
    private snackBar: MatSnackBar
  ) {
    this.allergyForm = this.formBuilder.group({
      allergyName: ['', Validators.required],
      allergyType: ['', Validators.required],
      allergySeverity: ['', Validators.required],
      symptoms: ['', Validators.required], // Modifier ici
      description: ['', Validators.required]
    });
    
  }
  ngOnInit(): void {
    this.loadSymptomNames(); // Chargez les noms des symptômes au démarrage du composant
  }

  loadSymptomNames(): void {
    this.symptomService.getAllSymptoms().subscribe(
      (data: Symptoms[]) => {
        this.symptomNames = data.map(symptom => symptom.symptomName);
        console.log('All Symptoms:', data); // Afficher tous les symptômes dans la console
      },
      (error) => {
        console.error('Error fetching symptoms:', error);
      }
    );
  }
  onSelectSymptom(selectedSymptoms: string[]): void {
    console.log('Selected symptoms:', selectedSymptoms);
    console.log('All selected symptoms:', this.selectedSymptoms);
    selectedSymptoms.forEach(symptomName => {
      const normalizedSymptomName = symptomName.toLowerCase();
      
      // Check if the side effect is already selected
      if (!this.selectedSymptoms.some(effect => effect.symptomName.toLowerCase() === normalizedSymptomName)) {
        // If not selected, fetch the side effect and add it
        this.symptomService.getAllSymptoms().subscribe(
          (symptoms: Symptoms[]) => {
            const selectedSymptom = symptoms.find(symptom => symptom.symptomName.toLowerCase() === normalizedSymptomName);
            if (selectedSymptom) {
              console.log('Symptom Name:', selectedSymptom.symptomName);
              console.log('Symptom Description:', selectedSymptom.symptomDesc);
              this.selectedSymptoms.push(selectedSymptom);
            } else {
              console.error('AdverseEffect not found:', symptomName);
            }
          },
          (error) => {
            console.error('Error fetching AdverseEffects:', error);
          }
        );
      }
    });
  }
 /* onSelectSymptom(selectedSymptoms: string[]): void {
    console.log('Selected symptoms:', selectedSymptoms);
    console.log('All selected symptoms:', this.selectedSymptoms);
  
    selectedSymptoms.forEach(symptomName => {
      // Normaliser le nom du symptôme en minuscules pour une comparaison insensible à la casse
      const normalizedSymptomName = symptomName.toLowerCase();
  
      // Recherchez le symptôme sélectionné dans la liste complète des symptômes
      this.symptomService.getAllSymptoms().subscribe(
        (symptoms: Symptoms[]) => {
          const selectedSymptom = symptoms.find(symptom => symptom.symptomName.toLowerCase() === normalizedSymptomName);
          if (selectedSymptom) {
            console.log('Symptom Name:', selectedSymptom.symptomName);
            console.log('Symptom Description:', selectedSymptom.symptomDesc);
            this.selectedSymptoms.push(selectedSymptom); // Ajoutez le symptôme sélectionné à this.selectedSymptoms
          } else {
            console.error('Symptom not found:', symptomName);
          }
        },
        (error) => {
          console.error('Error fetching symptoms:', error);
        }
      );
    });
  }*/
  
  onSubmit(): void {
    if (this.allergyForm.valid) {
      // Collect form data
      const formData = this.allergyForm.value;
      
      // Map selected side effect names to AdverseEffect objects
     /* const selected: Symptoms[] = formData.symptoms.map((symptomName: string) => {
        return { symptomKy: null, symptomName: symptomName, symptomDesc: '' };
      });*/
  
      // Create an Allergy object from form values
      const allergyData: Allergy = {
        allergyKy: null,
        allergyName:  formData.allergyName,
        allergyType: formData.allergyType,
        allergySeverity: formData.allergySeverity,
        allergyDesc: formData.description, // Update property name to match form control
        symptoms: this.selectedSymptoms
      };
      console.log('Allergy Data:', allergyData);
  
      this.allergyService.addAllergy(allergyData).subscribe(
        (response) => {
          console.log('Allergy added successfully:', response);
          this.dialogRef.close();
          // Optionally, display a success message or redirect the user
          this.dialogRef.close();
          this.showNotification(
          'snackbar-success',
          'Allergy added successfully...!!!',
          'bottom',
          'center'
        );
        },
        (error) => {
          console.error('Error adding allergy:', error);
          
        }
      );
    }
    else {
      this.showNotification('snackbar-warning', 'Please fill all required fields', 'bottom', 'right');
    }
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
}
