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
    
    });
    
  }
}
