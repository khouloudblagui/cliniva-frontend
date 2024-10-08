import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Doctors } from '../../doctors.model';
import { DoctorsService } from '../../doctors.service';

export interface DialogData {
  action: string;
  doctors: Doctors;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
  action: string;
  doctorsForm: UntypedFormGroup;
  dialogTitle: string;
  doctor: Doctors;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private doctorsService: DoctorsService
  ) {
    this.action = data.action;
    this.doctor = data.doctors;

    // Définir le titre du dialogue en fonction de l'action
    this.dialogTitle = this.action === 'edit' ? `Edit Doctor: ${this.doctor.name}` : 'New Doctor';

    // Créer le formulaire avec les données du docteur
    this.doctorsForm = this.createContactForm(this.doctor);
  }

  createContactForm(doctor: Doctors): UntypedFormGroup {
    return this.fb.group({
      name: [doctor ? doctor.name : '', [Validators.required]],
      email: [doctor ? doctor.email : '', [Validators.required, Validators.email]],
      mobile: [doctor ? doctor.mobile : '', [Validators.required]],
      department: [doctor ? doctor.department : '', [Validators.required]],
      specialization: [doctor ? doctor.specialization : '', [Validators.required]],
      degree: [doctor ? doctor.degree : '', [Validators.required]],
      date: [doctor ? doctor.date : '', [Validators.required]],
    });
  }

 /* confirmAdd() {
    if (this.action === 'edit') {
      this.doctorsService.updateDoctors(this.data.doctors.id, this.doctorsForm.value);
    } else {
      this.doctorsService.addDoctors(this.doctorsForm.value);
    }
    this.dialogRef.close();
  }//*/
  confirmAdd() {
    console.log(this.doctorsForm.value); // Vérifie ici les données envoyées
    if (this.action === 'edit') {
      this.doctorsService.updateDoctors(this.data.doctors.id, this.doctorsForm.value);
    } else {
      this.doctorsService.addDoctors(this.doctorsForm.value);
    }
    this.dialogRef.close();
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
