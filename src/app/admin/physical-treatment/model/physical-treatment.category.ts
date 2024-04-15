import { PhysicalTreatment } from "./physical-treatment";

export interface PhysicalTreatmentCategory {
  categoryid: number;
  phyCategoryName: string;
  phyCategoryDesc: string;
  physicalTreatments?: any[]; // Assurez-vous d'ajouter le modèle pour PhysicalTreatment si ce n'est pas déjà fait
}
