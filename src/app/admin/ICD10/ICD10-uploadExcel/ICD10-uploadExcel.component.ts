import { ICD10Service } from './../allICD10s/ICD10.service';
import { Component } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import * as XLSX from 'xlsx';
import { ICD10 } from '../allICD10s/ICD10.model';
@Component({
  selector: 'app-ICD10-uploadExcel',
  templateUrl: './ICD10-uploadExcel.component.html',
  styleUrls: ['./ICD10-uploadExcel.component.scss'],
})
export class ICD10uploadExcelComponent {
//uploadForm:UntypedFormGroup;
selectedFile: File | null = null; // Variable pour stocker le fichier sélectionné

  constructor(private icd10service: ICD10Service) {
    // constructor code
   /* this.uploadForm =this.fb.group({ uploadFile: ['', [this.fileSelectedValidator]]}
      ,
    )*/
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
        const icd10sData: ICD10[] = XLSX.utils.sheet_to_json<ICD10>(sheet);
  
        // Vérifier l'existence de chaque ingrédient dans le fichier Excel
        let allIcd10sExist = true;
        for (const icd10 of icd10sData) {
          const icd10Code = icd10.icd10Code;
  
          this.icd10service.checkIfIcd10Exists(icd10Code).subscribe({
            next: (exists: boolean) => {
              if (exists) {
                alert(`The ICD10 '${icd10Code}' already exist`);
              } else {
                allIcd10sExist = false;
              }
            },
            error: (error) => {
              console.error('An error occurred while checking for the existence of the icd10 :', error);
              allIcd10sExist = false;
            }
          });
        }
  
        setTimeout(() => {
          if (!allIcd10sExist) {
            this.icd10service.addICD10File(formData).subscribe({
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
            console.log('No files selected or all icd10s already exist');
          }
        }, 1000); // Attendre une seconde pour permettre la vérification des ingrédients avant d'ajouter le fichier
      };
      fileReader.readAsArrayBuffer(this.selectedFile);
    } else {
      console.log('No files selected');
    }
  }
  
  
}