import { AuthService } from './../../../core/service/auth.service';

import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterRequest } from '@core/models/register-request';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss'],
})
export class AddDoctorComponent {
  docForm: UntypedFormGroup;
  hide3 = true;
  agree3 = false;
  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router : Router
  ) {
    this.docForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      lastname: [''],
      gender: [''],
      mobile: [''],
      password: ['', [Validators.required]],
      conformPassword: ['', [Validators.required]],
      role: ['DOCTOR', [Validators.required]],
      designation: [''],
      department: [''],
      address: [''],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      dob: [''],
      education: [''],
      uploadFile: [''],
    });
  }
  onSubmit() {
    console.log('Form Value', this.docForm.value);
    this.authService
      .register(this.docForm.value as RegisterRequest)
      .subscribe((res) => {
        console.log(res);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Doctor has been saved',
          showConfirmButton: false,
          timer: 1500,
        }).then(()=>{
            this.router.navigateByUrl('admin/doctors/allDoctors')
        })
      });
  }
}
