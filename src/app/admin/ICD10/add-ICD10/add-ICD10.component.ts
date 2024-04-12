import { ICD10Service } from './../allICD10s/ICD10.service';
import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-add-ICD10',
  templateUrl: './add-ICD10.component.html',
  styleUrls: ['./add-ICD10.component.scss'],
})
export class AddICD10Component {
  icd10Form: UntypedFormGroup;
  hide3 = true;
  agree3 = false;
  constructor(private fb: UntypedFormBuilder ,private icd10service: ICD10Service) {
    this.icd10Form = this.fb.group({
      code: ['',[Validators.required, Validators.pattern('[a-zA-Z0-9]+'),this.notNullValidator,this.minLengthValidator]],
      notes: ['',[Validators.required,this.notNullValidator]],
      description: ['',[Validators.required,this.notNullValidator]],
      chapter: ['',],
      category: ['',],
      subcategory: ['',],
      extension: ['',],
      block: ['',],
    });
    }
    notNullValidator(control: { value: string | null; }) {
      if (control.value == null || control.value.trim() === '') {
          return { 'notNull': true };
      }
      return null;
  }
  minLengthValidator(control: { value: string | any[]; }) {
    if (control.value && control.value.length < 7) {
        return { 'minLength': true };
    }
    return null;
}
onSubmit() {
  const formData = this.icd10Form.value;

  // Vérifier si formData contient les propriétés attendues
  if(formData && formData.code && formData.description && formData.notes) {
      this.icd10service.addICD10s(formData.code, formData.description, formData.notes);
      console.log('ICD10 ajouté avec succès');
      alert('ICD10 ajouté avec succès');
      this.icd10Form.reset();
  } else {
      console.error('Les propriétés attendues dans formData sont manquantes.');
      // Vous pouvez afficher un message d'erreur à l'utilisateur ici si nécessaire
  }
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
