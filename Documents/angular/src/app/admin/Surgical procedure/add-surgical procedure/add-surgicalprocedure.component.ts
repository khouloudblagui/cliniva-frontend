import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { surgicalProcedureService } from '../allsurgicalprocedure/surgicalProcedure.service';
import { surgicalprocedure } from '../allsurgicalprocedure/surgicalprocedure.model';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-add-surgical-procedure',
  templateUrl: './add-surgicalprocedure.component.html',
  styleUrls: ['./add-surgicalprocedure.component.scss'],
})
export class AddSurgicalProcedureComponent {
  surgicalProcedureForm: UntypedFormGroup;

  hideCptCode = true;
  agreeCptCode = false;

  constructor(
    private fb: UntypedFormBuilder,
    private surgicalProcedureService: surgicalProcedureService, // Rename the variable for consistency
    private snackBar: MatSnackBar
  ) {
    this.surgicalProcedureForm = this.fb.group({
      cptCode: ['', [Validators.required]],
      cptDesc: ['', [Validators.required]],
      cptCategory: ['', [Validators.required]],
    });
  }

  async onSubmit() {
    if (this.surgicalProcedureForm.invalid) {
      this.snackBar.open('Please fill all required fields', '', {
        duration: 3000,
        panelClass: 'snackbar-warning',
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
      return;
    }

    const formData = this.surgicalProcedureForm.value;

    const newSurgicalProcedure: surgicalprocedure = {
      cptCode: formData.cptCode,
      cptDesc: formData.cptDesc,
      cptCategory: formData.cptCategory,
      cptky: 0,
    };

    try {

      const exists = await lastValueFrom(this.surgicalProcedureService.checkIfSurgicalProcedureExists(newSurgicalProcedure.cptCode));
      console.log('fonction add',exists);
      if (exists) {
        this.snackBar.open('The surgical procedure already exists', '', {
          duration: 3000,
          panelClass: 'snackbar-warning',
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      } else {
        await lastValueFrom(this.surgicalProcedureService.addsurgicalprocedure(newSurgicalProcedure));
        this.snackBar.open('Surgical procedure added successfully', '', {
          duration: 3000,
          panelClass: 'snackbar-success',
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        this.surgicalProcedureForm.reset();
      }
    } catch (error) {
      console.error('Error adding surgical procedure:', error);
      this.snackBar.open('Error adding surgical procedure', '', {
        duration: 3000,
        panelClass: 'snackbar-error',
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
    }
  }

  cancel() {
    this.surgicalProcedureForm.reset();
  }
}
/*
export class AddSurgicalProcedureComponent {
  surgicalProcedureForm: UntypedFormGroup;

  hideCptCode = true;
  agreeCptCode = false;

  constructor(private fb: UntypedFormBuilder, private surgicalprocedureservice: surgicalProcedureService, private snackBar: MatSnackBar) {
    this.surgicalProcedureForm = this.fb.group({

      cptCode: ['', [Validators.required]],
      cptDesc: ['', [Validators.required]],
      cptCategory: ['', [Validators.required]],
    });
  }

  onSubmit() {

    const formData = this.surgicalProcedureForm.value;

    const newSurgicalProcedure: surgicalprocedure = {
      cptCode: formData.cptCode,
      cptDesc: formData.cptDesc,
      cptCategory: formData.cptCategory,
      cptky:0
    };

    this.surgicalprocedureservice.checkIfSurgicalProcedureExists(newSurgicalProcedure.cptCode)
      .subscribe((exists: boolean) => {
        if (exists) {
          alert('The surgical procedure already exists');
        } else {
          this.surgicalprocedureservice.addsurgicalprocedure(newSurgicalProcedure);
          console.log('Surgical procedure added successfully', newSurgicalProcedure);
          alert('Surgical procedure added successfully');
          this.surgicalProcedureForm.reset();
        }
      });
  }

  cancel() {
    this.surgicalProcedureForm.reset();
  }
}
*/
