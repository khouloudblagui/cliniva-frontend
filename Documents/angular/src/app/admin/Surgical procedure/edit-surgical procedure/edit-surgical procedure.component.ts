import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-surgical-procedure',
  templateUrl: './edit-surgical procedure.component.html',
  styleUrls: ['./edit-surgical procedure.component.scss']
})
export class EditSurgicalProcedureComponent {
  surgicalProcedureForm: UntypedFormGroup;

  // Default form data for surgical procedure
  formData = {
    cptKy: '',
    cptCode: '',
    cptDesc: '',
    cptCategory: '',
  };

  constructor(private fb: UntypedFormBuilder) {
    // Create the surgical procedure form
    this.surgicalProcedureForm = this.createSurgicalProcedureForm();
  }

  // Form submission handler
  onSubmit() {
    console.log('Form Value:', this.surgicalProcedureForm.value);
    // Handle surgical procedure data submission (e.g., send data to the server)
  }

  // Create the surgical procedure form with initial values and validation rules
  createSurgicalProcedureForm(): UntypedFormGroup {
    return this.fb.group({
      cptKy: [this.formData.cptKy, [Validators.required, Validators.minLength(3)]],
      cptCode: [this.formData.cptCode, [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      cptDesc: [this.formData.cptDesc],
      cptCategory: [this.formData.cptCategory],
    });
  }
}
