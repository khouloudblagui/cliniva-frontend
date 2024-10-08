import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { surgicalProcedureService } from '../allsurgicalprocedure/surgicalProcedure.service';
import { surgicalprocedure } from '../allsurgicalprocedure/surgicalprocedure.model';
@Component({
  selector: 'app-surgicalprocedure-upload',
  templateUrl: './surgicalprocedure-upload.component.html',
  styleUrls: ['./surgicalprocedure-upload.component.scss'],
})
export class surgicalprocedureuploadComponent {
  selectedFile: File | null = null;
  constructor(private surgicalprocedureservice :surgicalProcedureService) {
    // constructor code
  }
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
        const surgicalprocedureData: surgicalprocedure[] = XLSX.utils.sheet_to_json<surgicalprocedure>(sheet);
        // Vérifier l'existence de chaque surgicalprocedure dans le fichier Excel
        let allsurgicalprocedureExist = true;
        for (const surgicalProcedure of surgicalprocedureData) {
          const cptCode = surgicalProcedure.cptCode;
          this.surgicalprocedureservice.checkIfSurgicalProcedureExists(cptCode).subscribe({
            next: (exists: boolean) => {
              if (exists) {
                alert(`The  '${cptCode}' already exist`);
              } else {
                allsurgicalprocedureExist = false;
              }
            },
            error: (error) => {
              console.error('An error occurred while checking for the existence of the surgicalprocedure :', error);
              allsurgicalprocedureExist = false;
            }
          });
        }

        setTimeout(() => {
          if (!allsurgicalprocedureExist) {
            this.surgicalprocedureservice.addsurgicalprocedureFile(formData).subscribe({
              next: (data) => {
                console.log('The file has been successfully added to the database', data);
                alert('File Added Successfully');

                this.selectedFile = null;
              },
              error: (error) => {
                console.error('Une erreur s\'est produite lors de l\'ajout du fichier :', error);
              }
            });
          } else {
            console.log('No files selected or all surgicalprocedure already exist');
          }
        }, 100);
      };
      fileReader.readAsArrayBuffer(this.selectedFile);
    } else {
      console.log('No files selected');
    }
  }


}
