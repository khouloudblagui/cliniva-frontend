import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ICD10Service } from '../../ICD10.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { ICD10 } from '../../ICD10.model';


export interface DialogData {
  id: number;
  action: string;
  ICD10: ICD10;
}

@Component({
  selector: 'app-form-dialog:not(f)',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
  code: string ='' ;
  action: string;
  dialogTitle: string;
  ICD10sForm: UntypedFormGroup;
  ICD10s: ICD10;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public ICD10Service: ICD10Service,
    private fb: UntypedFormBuilder,private icd10service: ICD10Service) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.ICD10.icd10Code;
      this.ICD10s = data.ICD10;
    } else {
      this.dialogTitle = 'New ICD10';
      const blankObject = {} as ICD10;
      this.ICD10s = new ICD10(blankObject);
    }
    this.ICD10sForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      
      code: [this.ICD10s.icd10Code],
      notes: [this.ICD10s.icd10Notes],
      description: [this.ICD10s.icd10Description],
      chapter: [this.ICD10s.icd10Chapter],
      category: [this.ICD10s.icd10Category],
      subcategory: [this.ICD10s.icd10Subcategory],
      extension: [this.ICD10s.icd10Extension],
      block: [this.ICD10s.icd10Block],
    });
  }
 
  submit() {
    
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    const formData = this.ICD10sForm.value;
    this.ICD10Service.updateICD10s(formData.code, formData.description, formData.notes);
  // this.ICD10Service.addICD10s(this.ICD10sForm.getRawValue(), this.ICD10sForm.getRawValue(), this.ICD10sForm.getRawValue());
  }



  chapterValue: string = '';
  BlockValue: string = '';
  CategoryValue: string = '';
  SubcategoryValue: string = '';
  ExtensionValue: string = '';

  
  updateChapter(codeValue: string) {
    if (codeValue.length >= 7) {
        this.chapterValue = codeValue.substring(0, 1);
    } else {
        this.chapterValue = codeValue;
    }
}

updateBlock(codeValue: string) {
  if (codeValue.length >= 7) {
      this.BlockValue = codeValue.substring(1, 3);
  } else {
      this.BlockValue = codeValue;
  }
}
updateCategory(codeValue: string) {
  if (codeValue.length >= 7) {
      this.CategoryValue = codeValue.substring(3, 4);
  } else {
      this.CategoryValue = codeValue;
  }
}
updateSubcategory(codeValue: string) {
  if (codeValue.length >= 7) {
      this.SubcategoryValue = codeValue.substring(4, 6);
  } else {
      this.SubcategoryValue = codeValue;
  }
}
updateExtension(codeValue: string) {
  
    if (codeValue.length > 0) {
        this.ExtensionValue = codeValue.slice(-1);
    } else {
        this.ExtensionValue = '';
    }
}
}
