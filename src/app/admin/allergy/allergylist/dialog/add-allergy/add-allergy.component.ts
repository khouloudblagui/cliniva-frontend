import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Allergy } from 'app/admin/allergy/model/allergy';
import { AllergyService } from 'app/admin/allergy/services/allergy.service';
@Component({
  selector: 'app-add-allergy',
  templateUrl: './add-allergy.component.html',
  styleUrls: ['./add-allergy.component.scss']
})
export class AddAllergyComponent {
  allergyForm: FormGroup;
  


  constructor(
    private formBuilder: FormBuilder,
    private allergyService: AllergyService,
    public dialogRef: MatDialogRef<AddAllergyComponent>,
    private snackBar: MatSnackBar
  ) {
    this.allergyForm = this.formBuilder.group({
      allergyName: ['', Validators.required],
      allergyType: ['', Validators.required],
      allergySeverity: ['', Validators.required],
      allergySymptoms: ['', Validators.required], 
      description: ['', Validators.required]
    });
    
  }
  ngOnInit(): void {
  }

  
  
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
        allergySymptoms: formData.allergySymptoms
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
