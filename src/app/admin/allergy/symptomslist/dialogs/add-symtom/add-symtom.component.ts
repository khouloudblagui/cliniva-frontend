import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SymptomService } from 'app/admin/allergy/services/symptoms.service';

@Component({
  selector: 'app-add-symtom',
  templateUrl: './add-symtom.component.html',
  styleUrls: ['./add-symtom.component.scss']
})
export class AddSymtomComponent {
  symptomForm: FormGroup; // Changez le nom du formulaire

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private symptomService: SymptomService, // Utilisez le service pour la gestion des symptômes
    public dialogRef: MatDialogRef<AddSymtomComponent>
  ) {
    this.symptomForm = this.formBuilder.group({
      symptomName: ['', Validators.required], // Changez le nom des champs
      symptomDesc: ['', Validators.required],
      // Ajoutez d'autres champs si nécessaire pour les symptômes
    });
  }

  onSubmit(): void {
    if (this.symptomForm.valid) {
      const symptomData = this.symptomForm.value;
      this.symptomService.addSymptom(symptomData).subscribe(() => {
        console.log('Symptom added successfully');
        this.dialogRef.close();
        this.showNotification(
          'snackbar-success',
          'Add Symptom Successfully...!!!',
          'bottom',
          'center'
        );
      }, error => {
        console.error('Error adding symptom:', error);
        this.showNotification('error', 'Failed to added symtom', 'bottom', 'right');
      });
    }
    else {
      this.showNotification('snackbar-warning', 'Please fill all required fields', 'bottom', 'right');
    }
  }

  onCancel(): void {
    this.dialogRef.close();
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
