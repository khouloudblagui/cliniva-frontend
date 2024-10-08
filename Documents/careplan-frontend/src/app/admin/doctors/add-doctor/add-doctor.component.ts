import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DoctorsService } from '../alldoctors/doctors.service';


@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss'],
})
export class AddDoctorComponent {
  docForm: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder, private doctorsService: DoctorsService) {
    this.docForm = this.fb.group({
      first: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      last: [''],
      gender: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      password: ['', [Validators.required]],
      conformPassword: ['', [Validators.required]],
      designation: [''],
      department: [''],
      address: [''],
      email: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
      dob: ['', [Validators.required]],
      education: [''],
      uploadFile: [''],
    });
  }

  onSubmit() {
    if (this.docForm.valid) {
      const newDoctor = this.docForm.value;
      this.doctorsService.addDoctors(newDoctor);
    }
  }
}
