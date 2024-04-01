import { Component,ViewChild } from '@angular/core';
import { IngredientService } from '../allingredient/ingredient.service';
import * as XLSX from 'xlsx';

interface IngredientData {
  ingredient_name: string;
} 
@Component({
  selector: 'app-upload-file-ingredient',
  templateUrl: './upload-file-ingredient.component.html',
  styleUrls: ['./upload-file-ingredient.component.scss']
})

export class UploadFileIngredientComponent {
  selectedFile: File | null = null; // Variable pour stocker le fichier sélectionné

  constructor(private ingredientService: IngredientService) {}

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
        const ingredientsData: IngredientData[] = XLSX.utils.sheet_to_json<IngredientData>(sheet);
  
        // Vérifier l'existence de chaque ingrédient dans le fichier Excel
        let allIngredientsExist = true;
        for (const ingredient of ingredientsData) {
          const ingredientName = ingredient.ingredient_name;
  
          this.ingredientService.checkIfIngredientExists(ingredientName).subscribe({
            next: (exists: boolean) => {
              if (exists) {
                alert(`The ingredient '${ingredientName}' already exist`);
              } else {
                allIngredientsExist = false;
              }
            },
            error: (error) => {
              console.error('An error occurred while checking for the existence of the ingredient :', error);
              allIngredientsExist = false;
            }
          });
        }
  
        setTimeout(() => {
          if (!allIngredientsExist) {
            this.ingredientService.addIngredientFile(formData).subscribe({
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
            console.log('No files selected or all ingredients already exist');
          }
        }, 1000); // Attendre une seconde pour permettre la vérification des ingrédients avant d'ajouter le fichier
      };
      fileReader.readAsArrayBuffer(this.selectedFile);
    } else {
      console.log('No files selected');
    }
  }
  
  
}
