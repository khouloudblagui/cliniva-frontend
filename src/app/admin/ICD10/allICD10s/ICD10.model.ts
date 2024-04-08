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


 
/* id: number;
  img: string;
  name: string;
  email: string;
  date: string;
  specialization: string;
  mobile: string;
  department: string;
  degree: string;
  constructor(ICD10: ICD10) {
    {
      this.id = ICD10.id || this.getRandomID();
      this.img = ICD10.img || 'assets/images/user/user1.jpg';
      this.name = ICD10.name || '';
      this.email = ICD10.email || '';
      this.date = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.specialization = ICD10.specialization || '';
      this.mobile = ICD10.mobile || '';
      this.department = ICD10.department || '';
      this.degree = ICD10.degree || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }*/

