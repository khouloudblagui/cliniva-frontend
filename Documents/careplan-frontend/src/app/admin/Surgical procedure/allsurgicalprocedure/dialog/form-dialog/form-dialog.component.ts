import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { surgicalProcedureService } from '../../surgicalProcedure.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { surgicalprocedure } from '../../surgicalprocedure.model';


export interface DialogData {
  id: number;
  action: string;
  surgicalprocedure: surgicalprocedure;
}

@Component({
  selector: 'app-form-dialog:not(n)',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
onCancelClick() {
throw new Error('Method not implemented.');
}
  code!: string;
  action: string;
  dialogTitle: string;
  surgicalprocedureForm: UntypedFormGroup;
  surgicalprocedure: surgicalprocedure;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public surgicalProcedureService: surgicalProcedureService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.surgicalprocedure.cptCode;
      this.surgicalprocedure = data.surgicalprocedure;
    } else {
      this.dialogTitle = 'New surgicalprocedure';
      const blankObject = {} as surgicalprocedure;
      this.surgicalprocedure = new surgicalprocedure(blankObject);
    }
    this.surgicalprocedureForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      cptky: [this.surgicalprocedure.cptky],
      cptcode: [this.surgicalprocedure.cptCode],
      cptDesc: [this.surgicalprocedure.cptDesc],
      cptcategory: [this.surgicalprocedure.cptCategory],
    });
  }
  submit() {
    // emppty
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    const formData = this.surgicalprocedureForm.value;
    this.surgicalProcedureService.updatesurgicalprocedure(formData.cptcode,formData.cptDesc,formData.cptcategory);
  }
}
