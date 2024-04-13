export interface Vaccination {
    idVaccination: any;
    vaccineLabel: string;
    vaccineType: String; 
    vaccineICD10Code: ICD10; 
    vaccineMedication: Medication; 
    vaccineManufacturer: string;
    sideEffects: AdverseEffect[]; 
  }

  export interface ICD10 {
    name: string;  }
  
  export interface Medication {
    medicationName: string;
  }
  
  export interface AdverseEffect {
    idAdverseEffect:any;
    adverseEffectName:string;
    adverseEffectSeverity:string
    adverseEffectDesc:string;
    vaccinations?: any[];
  }
  