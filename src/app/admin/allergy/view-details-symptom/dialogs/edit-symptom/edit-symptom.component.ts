import { Component, Inject, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Symptoms } from 'app/admin/allergy/model/symptoms';
import { SymptomService } from 'app/admin/allergy/services/symptoms.service';


@Component({
  selector: 'app-edit-symptom',
  templateUrl: './edit-symptom.component.html',
  styleUrls: ['./edit-symptom.component.scss']
})
export class EditSymptomComponent implements OnInit {
  symptomForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditSymptomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { symptom: Symptoms },
    private formBuilder: FormBuilder,
    private symptomService: SymptomService,
    private snackBar: MatSnackBar
  ) {
    this.symptomForm = this.formBuilder.group({
      symptomName: ['', Validators.required],
      symptomDesc: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.data.symptom && this.data.symptom.symptomKy !== undefined) {
      this.symptomService.getSymptomById(this.data.symptom.symptomKy).subscribe(symptom => {
        this.symptomForm.patchValue({
          symptomName: symptom.symptomName,
          symptomDesc: symptom.symptomDesc
        });
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.symptomForm.valid && this.data.symptom && this.data.symptom.symptomKy !== undefined) {
      const updatedSymptom: Symptoms = {
        symptomKy: this.data.symptom.symptomKy,
        symptomName: this.symptomForm.value.symptomName,
        symptomDesc: this.symptomForm.value.symptomDesc
      };

      this.symptomService.updateSymptom(this.data.symptom.symptomKy, updatedSymptom).subscribe(() => {
        console.log('Symptom updated successfully.');
        this.dialogRef.close(updatedSymptom);
        this.showNotification(
          'snackbar-success',
          'Symptom updated successfully....!!!',
          'bottom',
          'center'
        );
      }, error => {
        console.error('Error updating symptom:', error);
        this.showNotification('error', 'Failed to updating symptom', 'bottom', 'right');
        // Gérer l'erreur de manière appropriée
      });
    } else {
      console.error('Form is invalid or symptom data is missing.');
      this.showNotification('snackbar-warning', 'Please fill all required fields', 'bottom', 'right');
      // Afficher un message d'erreur ou prendre une autre action
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
}