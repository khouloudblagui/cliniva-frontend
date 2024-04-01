import { MedicIngredientLink } from "../models/MedicIngredientLink";
export interface MedicationResponse {
  medicationKy?:number;
  medicationCode: string;
  medicationName: string;
  medicationType: MedicationType; 
  medicationStrength: MedicationStrength; 
  medicationDosageForm: DosageForm;
    ingredients: Ingredient[];
    medicIngredientLinks?: MedicIngredientLink[];
  }
  
export interface Ingredient {
    ingredientKy: any;
    ingredientName: string;
    ingredientDesc: string;
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
  
  