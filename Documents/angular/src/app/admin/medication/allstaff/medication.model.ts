


export class Medication {
  medicationKy?:number;
  medicationCode: string;
  medicationName: string;
  medicationType: MedicationType;
  medicationStrength: MedicationStrength;
  medicationDosageForm: DosageForm;



  constructor(medication: Medication) {
    this.medicationKy=medication.medicationKy;
    this.medicationCode = medication.medicationCode || '';
    this.medicationName = medication.medicationName || '';
    this.medicationType = medication.medicationType ;
    this.medicationStrength = medication.medicationStrength;
    this.medicationDosageForm = medication.medicationDosageForm ;

  }


}
export enum DosageForm {
  ORAL,
  TOPICAL,
  INJECTABLE
}
export enum MedicationStrength {

  STRENGTH_1_PERCENT,
  STRENGTH_2_PERCENT,
  STRENGTH_5_PERCENT,
  STRENGTH_10_PERCENT,
  STRENGTH_5MG_PER_ML,
  STRENGTH_10MG_PER_ML,
  STRENGTH_20MG_PER_ML,
  STRENGTH_50MG_PER_ML,
  STRENGTH_100MG_PER_ML,
  STRENGTH_50MG,
  STRENGTH_100MG,
  STRENGTH_250MG,
  STRENGTH_500MG,
  STRENGTH_1000MG
}
export enum MedicationType {
  OINTMENT,
  SOFT_CAPSULE,
  FILM_COATED_TABLET
}

