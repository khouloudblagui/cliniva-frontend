import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DoctorsService } from '../alldoctors/doctors.service';


@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.scss'],
})
export class EditDoctorComponent implements OnInit {
  docForm: UntypedFormGroup;
  doctorId!: number;

  constructor(
    private fb: UntypedFormBuilder,
    private doctorsService: DoctorsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.docForm = this.fb.group({
      first: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      last: [''],
      gender: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      password: [''],
      conformPassword: [''],
      designation: [''],
      department: [''],
      address: [''],
      email: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
      dob: ['', [Validators.required]],
      education: [''],
      uploadFile: [''],
    });
  }

  ngOnInit(): void {
    this.doctorId = this.route.snapshot.params['id'];
    this.loadDoctorData();
  }

  loadDoctorData(): void {
    this.doctorsService.getDoctorById(this.doctorId).subscribe((doctor) => {
      this.docForm.patchValue(doctor);
    });
  }

  onSubmit() {
    if (this.docForm.valid) {
      this.doctorsService.updateDoctors(this.doctorId, this.docForm.value);
    }
  }
}
