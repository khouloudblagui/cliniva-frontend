import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Symptoms } from 'app/admin/allergy/model/symptoms';
import { SymptomService } from 'app/admin/allergy/services/symptoms.service';

@Component({
  selector: 'app-edit-symtom',
  templateUrl: './edit-symtom.component.html',
  styleUrls: ['./edit-symtom.component.scss']
})
export class EditSymtomComponent {
  symptomForm: FormGroup;
  severityLevels: string[] = ['MILD', 'MODERATE', 'SEVERE']; // Utilisez une liste de niveaux de gravité des symptômes

  constructor(
    public dialogRef: MatDialogRef<EditSymtomComponent>,
    @Inject(MAT_DIALOG_DATA) public symptom: Symptoms, // Changez le type de données pour refléter les symptômes
    private formBuilder: FormBuilder,
    private symptomService: SymptomService // Injectez le service SymptomService
  ) {
    this.symptomForm = this.formBuilder.group({
      symptomName: [symptom.symptomName, Validators.required],
      symptomDescription: [symptom.symptomDesc, Validators.required],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.symptomForm.valid && this.symptom.symptomKy !== undefined) {
      const updatedSymptom: Symptoms = {
        symptomKy: this.symptom.symptomKy,
        symptomName: this.symptomForm.value.symptomName,
        symptomDesc: this.symptomForm.value.symptomDescription
      };
      this.symptomService.updateSymptom(this.symptom.symptomKy, updatedSymptom).subscribe((response: Symptoms) => {
        console.log('Symptom updated successfully');
        this.dialogRef.close(response);
      }, error => {
        console.error('Error updating symptom:', error);
        // Gérez l'erreur, affichez un message à l'utilisateur, etc.
      });
    } else {
      console.error("Form is invalid or symptom id is undefined.");
      // Affichez un message d'erreur ou prenez une autre action si le formulaire n'est pas valide
    }
  }
  



}