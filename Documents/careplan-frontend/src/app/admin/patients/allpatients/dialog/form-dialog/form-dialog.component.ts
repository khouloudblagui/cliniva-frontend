import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { PatientService } from '../../patient.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Patient } from '../../patient.model';

export interface DialogData {
  id: number;
  action: string;
  patient: Patient;
}

@Component({
  selector: 'app-form-dialog:not(i)',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  patientForm: UntypedFormGroup;
  patient: Patient;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public patientService: PatientService,
    private fb: UntypedFormBuilder
  ) {
    this.action = data.action;
    this.patient = this.action === 'edit' ? data.patient : new Patient({} as Patient);
    this.dialogTitle = this.action === 'edit' ? data.patient.name : 'New Patient';
    this.patientForm = this.createContactForm();
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.patient.id],
      img: [this.patient.img],
      name: [this.patient.name, Validators.required],
      gender: [this.patient.gender, Validators.required],
      date: [this.patient.date, Validators.required],
      bGroup: [this.patient.bGroup],
      mobile: [this.patient.mobile, Validators.required],
      address: [this.patient.address],
      treatment: [this.patient.treatment],
    });
  }

  submit() {
    if (this.action === 'edit') {
      this.patientService.updatePatient(this.patientForm.getRawValue());
    } else {
      this.patientService.addPatient(this.patientForm.getRawValue());
    }
    this.dialogRef.close(1); // Ferme la boîte de dialogue et renvoie 1 en cas de succès
  }

  public confirmAdd(): void {
    this.submit(); // Appeler `submit()` lorsque le bouton Save est cliqué
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  /*public confirmAdd(): void {
    if (this.action === 'edit') {
      this.patientService.updatePatient(this.patientForm.getRawValue());
    } else {
      this.patientService.addPatient(this.patientForm.getRawValue());
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }*/
}
