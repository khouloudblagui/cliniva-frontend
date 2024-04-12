import { formatDate } from '@angular/common';
export class ICD10 {
  icd10ky: number;
  icd10Code: string;
  icd10Chapter: string;
  icd10Block: string;
  icd10Category: string;
  icd10Subcategory: string;
  icd10Extension: string;
  icd10Notes: string;
  icd10Description: string;
  constructor(ICD10: ICD10) {
    this.icd10ky = ICD10.icd10ky ;
    this.icd10Code = ICD10.icd10Code || '';
    this.icd10Chapter = ICD10.icd10Chapter || '';
    this.icd10Block = ICD10.icd10Block || '';
    this.icd10Category = ICD10.icd10Category || '';
    this.icd10Subcategory = ICD10.icd10Subcategory || '';
    this.icd10Extension = ICD10.icd10Extension || '';
    this.icd10Notes = ICD10.icd10Notes || '';
    this.icd10Description = ICD10.icd10Description || '';
  }
}


 
