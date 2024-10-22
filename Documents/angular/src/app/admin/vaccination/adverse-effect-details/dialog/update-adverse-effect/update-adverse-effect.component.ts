import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AdverseEffect } from 'app/admin/vaccination/model/vaccination';
import { AdverseEffectService } from 'app/admin/vaccination/services/adverse-effect.service';

@Component({
  selector: 'app-update-adverse-effect',
  templateUrl: './update-adverse-effect.component.html',
  styleUrls: ['./update-adverse-effect.component.scss']
})
export class UpdateAdverseEffectComponent {
  
  adverseEffectForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateAdverseEffectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { adverseEffect: AdverseEffect },
    private formBuilder: FormBuilder,
    private adverseEffectService: AdverseEffectService,
    private snackBar: MatSnackBar
  ) {
    this.adverseEffectForm = this.formBuilder.group({
      adverseEffectName: ['', Validators.required],
      adverseEffectSeverity: ['', Validators.required],
      adverseEffectDesc: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.data.adverseEffect && this.data.adverseEffect.idAdverseEffect !== undefined) {
      this.adverseEffectService.getSideEffectsById(this.data.adverseEffect.idAdverseEffect).subscribe(adverseEffect => {
        this.adverseEffectForm.patchValue({
          adverseEffectName: adverseEffect.adverseEffectName,
          adverseEffectSeverity: adverseEffect.adverseEffectSeverity,
          adverseEffectDesc:adverseEffect.adverseEffectDesc
        });
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.adverseEffectForm.valid && this.data.adverseEffect && this.data.adverseEffect.idAdverseEffect !== undefined) {
      const updatedAdverseEffect: AdverseEffect = {
        idAdverseEffect: this.data.adverseEffect.idAdverseEffect,
        adverseEffectName: this.adverseEffectForm.value.adverseEffectName,
        adverseEffectSeverity: this.adverseEffectForm.value.adverseEffectSeverity,
        adverseEffectDesc: this.adverseEffectForm.value.adverseEffectDesc
      };

      this.adverseEffectService.updateSideEffects(updatedAdverseEffect,this.data.adverseEffect.idAdverseEffect,).subscribe(() => {
        console.log('AdverseEffect updated successfully.');
        this.dialogRef.close(updatedAdverseEffect);
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
      console.error('Form is invalid or Adverse Effect data is missing.');
      // Afficher un message d'erreur ou prendre une autre action
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
}
