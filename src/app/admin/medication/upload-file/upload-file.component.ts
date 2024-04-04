import { Component } from '@angular/core';
import { MedicationService } from '../allstaff/medication.service'; // Assurez-vous d'importer le service de médication approprié
import * as XLSX from 'xlsx';

interface MedicationData {
  medication_name: string;
  medication_code:string;
}
@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent {
  selectedFile: File | null = null; // Variable pour stocker le fichier sélectionné

  constructor(private medicationService: MedicationService) {}

  onFileSelected(event: any) {
    // Récupérer le fichier sélectionné à partir de l'objet event
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
  
      // Lire le fichier Excel
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        const data = new Uint8Array(fileReader.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
  
        // Récupérer la première feuille de calcul
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
  
        // Convertir la feuille de calcul en tableau de données
        const medicationsData: MedicationData[] = XLSX.utils.sheet_to_json<MedicationData>(sheet);
  
        let allMedicationsExist = true;
        for (const medication of medicationsData) {
          const medicationName = medication.medication_name;
          const medicationCode= medication.medication_code;
  
          this.medicationService.checkIfMedicationExists(medicationName,medicationCode).subscribe({
            next: (exists: boolean) => {
              if (exists) {
                alert(`The Medication with name '${medicationName}' or code'${medicationCode}' already exist`);
              } else {
                allMedicationsExist = false;
              }
            },
            error: (error) => {
              console.error('An error occurred while checking for the existence of medication', error);
              allMedicationsExist = false;
            }
          });
        }
        setTimeout(() => {
          if (!allMedicationsExist) {
            this.medicationService.addMedicationFile(formData).subscribe({
              next: (data) => {
                console.log('The file has been successfully added to the database', data);
                alert('File Added Successfully');
                this.selectedFile = null;
              },
              error: (error) => {
                console.error('An error occurred while adding the file :', error);
              }
            });
          } else {
            console.log('No files selected or all medications already exist');
          }
        }, 1000); 
      };
      fileReader.readAsArrayBuffer(this.selectedFile);
    } else {
      console.log('No files selected');
    }
  }
}



