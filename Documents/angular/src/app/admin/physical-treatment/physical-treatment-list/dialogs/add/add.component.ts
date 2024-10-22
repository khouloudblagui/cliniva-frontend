import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { PhysicalTreatment } from 'app/admin/physical-treatment/model/physical-treatment';
import { PhysicalTreatmentCategory } from 'app/admin/physical-treatment/model/physical-treatment.category';
import { PhyTrCategoryService } from 'app/admin/physical-treatment/services/physical-treatment-category.service';
import { PhyTreatmentService } from 'app/admin/physical-treatment/services/physical-treatment.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  treatmentForm: FormGroup;
  treatmentCategories: PhysicalTreatmentCategory[] = [];
  selectedCategory: PhysicalTreatmentCategory | null = null; // Initialisé à null

  constructor(
    private formBuilder: FormBuilder,
    private treatmentService: PhyTreatmentService,
    private treatmentCategoryService: PhyTrCategoryService,
    public dialogRef: MatDialogRef<AddComponent>,
    private snackBar: MatSnackBar
  ) {
    this.treatmentForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      duration: ['', Validators.required],
      note: ['', Validators.required],
      category: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
    this.loadTreatmentCategories();
  }

  loadTreatmentCategories(): void {
    this.treatmentCategoryService.getAllPhyTrCategories().subscribe(
      (data: PhysicalTreatmentCategory[]) => {
        this.treatmentCategories = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des catégories de traitement :', error);
      }
    );
  }

  onSubmit(): void {
    if (this.treatmentForm.valid && this.selectedCategory) {
      const formData = this.treatmentForm.value;
  
      const treatmentData: PhysicalTreatment = {
        idtreatment: 0, // Modifié en undefined
        phyTrName: formData.name,
        phyTrDesc: formData.description,
        phyTrDuration: formData.duration,
        phyTrNote: formData.note,
        physicalTreatmentCategory: this.selectedCategory
      };
  
      this.treatmentService.saveTreatment(treatmentData).subscribe(
        (response) => {
          console.log('Traitement added successfully :', response);
          this.dialogRef.close();
          this.showNotification(
            'snackbar-success',
            'Physical Treatment added successfully...!!!',
            'bottom',
            'center'
          );
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du traitement :', error);
        }
      );
    } else {
      this.showNotification('snackbar-warning', 'Please fill all required fields', 'bottom', 'right');
    }
  }
  
  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSelectCategory(categoryId: number): void {
    // Sélectionner la catégorie en fonction de l'ID
    const selectedCategory = this.treatmentCategories.find(category => category.categoryid === categoryId);
    this.selectedCategory = selectedCategory !== undefined ? selectedCategory : null;
    console.log('Selected Category:', this.selectedCategory);
  }
}