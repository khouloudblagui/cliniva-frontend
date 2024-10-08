import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { BioAnalysis } from 'app/admin/bioanalysis/model/bioanalysis';
import { BioanalysisService } from 'app/admin/bioanalysis/service/bioanalysis.service';

@Component({
  selector: 'app-updatebioanalysis',
  templateUrl: './updatebioanalysis.component.html',
  styleUrls: ['./updatebioanalysis.component.scss']
})
export class UpdatebioanalysisComponent implements OnInit {

  bioanalysisForm!: FormGroup; // Ajout du signe d'exclamation pour indiquer que la propriété sera initialisée dans ngOnInit
  bioanalysis!: BioAnalysis; // Ajout du signe d'exclamation pour indiquer que la propriété sera initialisée dans ngOnInit

  constructor(
    private dialogRef: MatDialogRef<UpdatebioanalysisComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { bioanalysis: BioAnalysis }, // Inject data
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private bioanalysisService: BioanalysisService
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.data.bioanalysis && this.data.bioanalysis.id !== undefined) {
      this.bioanalysisService.getAnalysisById(this.data.bioanalysis.id).subscribe(bioanalysis => {
        this.bioanalysisForm.patchValue({
          analysisName: bioanalysis.biologicalAnalysisName,
          analysisType: bioanalysis.biologicalAnalysisType,
          analysisDesc: bioanalysis.biologicalAnalysisDesc,
          analysisUnit: bioanalysis.biologicalAnalysisMeasurmentUnit,
          analysisRefValueMin: bioanalysis.biologicalAnalysisRefValueMin,
          analysisRefValueMax: bioanalysis.biologicalAnalysisRefValueMax
        });
      });
    }
  }

  initForm(): void {
    this.bioanalysisForm = this.formBuilder.group({
      analysisName: ['', Validators.required],
      analysisType: ['', Validators.required],
      analysisDesc: ['', Validators.required],
      analysisUnit: ['', Validators.required],
      analysisRefValueMin: ['', Validators.required],
      analysisRefValueMax: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.bioanalysisForm.valid && this.data.bioanalysis && this.data.bioanalysis.id !== undefined) {
      const updatedAnalysis: BioAnalysis = {
        id: this.data.bioanalysis.id,
        biologicalAnalysisName: this.bioanalysisForm.value.analysisName,
        biologicalAnalysisType: this.bioanalysisForm.value.analysisType,
        biologicalAnalysisDesc: this.bioanalysisForm.value.analysisDesc,
        biologicalAnalysisMeasurmentUnit: this.bioanalysisForm.value.analysisUnit,
        biologicalAnalysisRefValueMin: this.bioanalysisForm.value.analysisRefValueMin,
        biologicalAnalysisRefValueMax: this.bioanalysisForm.value.analysisRefValueMax
      };

      this.bioanalysisService.updateAnalysis(this.data.bioanalysis.id, updatedAnalysis).subscribe(() => {
        console.log('BioAnalysis updated successfully.');
        this.dialogRef.close(updatedAnalysis);
        this.showNotification(
          'snackbar-success',
          'BioAnalysis updated successfully....!!!',
          'bottom',
          'center'
        );
      }, error => {
        console.error('Error updating BioAnalysis:', error);
        this.showNotification('error', 'Failed to update BioAnalysis', 'bottom', 'right');
        // Gérer l'erreur de manière appropriée
      });
    } else {
      console.error('Form is invalid or BioAnalysis data is missing.');
      // Afficher un message d'erreur ou prendre une autre action
      this.showNotification('snackbar-warning', 'Please fill all required fields', 'bottom', 'right');
    }
  }

  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ): void {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}