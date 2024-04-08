import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-edit-ICD10',
  templateUrl: './edit-ICD10.component.html',
  styleUrls: ['./edit-ICD10.component.scss'],
})
export class EditICD10Component {
  icd10Form: UntypedFormGroup;
  formdata = {
    Code: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
   Any: [''],
   /* gender: 'Female',
    mobile: '123456789',
    password: '123',
    conformPassword: '123',
    email: 'test@example.com',
    designation: 'Sr. ICD10',
    department: '2',
    address: '101, Elanxa, New Yourk',
    dob: '1987-02-17T14:22:18Z',
    education: 'M.B.B.S.',
    uploadFile: '',*/
  };
  constructor(private fb: UntypedFormBuilder) {
    this.icd10Form = this.createContactForm();
  }
  onSubmit() {
    console.log('Form Value', this.icd10Form.value);
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      Code: [this.formdata.Code],
     Any: [this.formdata.Any],
    /*  first: [
        this.formdata.first,
        [Validators.required, Validators.pattern('[a-zA-Z]+')],
      ],
      last: [this.formdata.last],
      gender: [this.formdata.gender, [Validators.required]],
      mobile: [this.formdata.mobile, [Validators.required]],
      password: [this.formdata.password],
      conformPassword: [this.formdata.conformPassword],
      email: [
        this.formdata.email,
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      designation: [this.formdata.designation],
      department: [this.formdata.department],
      address: [this.formdata.address],
      dob: [this.formdata.dob, [Validators.required]],
      education: [this.formdata.education],
      uploadFile: [this.formdata.uploadFile],*/
    });
    
  }
}
