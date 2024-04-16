
export interface Allergy {
  allergyKy: any;
  allergyName: string;
  allergyType: string; // Changer le type en string ou en enum si nécessaire
  allergyDesc: string;
  allergySeverity: string; // Changer le type en string ou en enum si nécessaire
  allergySymptoms: String;
}



/*export interface Allergy {
    allergyKy: number;
    allergyName: string;
    allergyType: AllergyType;
    allergyDesc: string;
    allergySeverity: Severity;
    symptoms: Symptoms[];
  }
  
  export enum AllergyType {
    // Définissez les différents types d'allergies ici
    HAY_FEVER, FOOD_ALLERGY, INSECT_STING_ALLERGY, DRUG_ALLERGY, ATOPIC_DERMATITIS, ANAPHYLAXIS
  }
  
  export enum Severity {
    // Définissez les différentes sévérités d'allergies ici
    MILD, MODERATE, SEVERE
  }
  
  export interface Symptoms {
    symptomKy: number;
    symptomName: string;
    symptomDesc: string;
  }
  */