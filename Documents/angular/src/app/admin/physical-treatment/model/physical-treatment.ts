import { PhysicalTreatmentCategory } from "./physical-treatment.category";

export interface PhysicalTreatment {
    idtreatment: number;
    phyTrName: string;
    phyTrDesc: string;
    phyTrDuration: string;
    phyTrNote: string;
    physicalTreatmentCategory: PhysicalTreatmentCategory; // Assurez-vous de définir le modèle pour PhysicalTreatmentCategory également
  }
  