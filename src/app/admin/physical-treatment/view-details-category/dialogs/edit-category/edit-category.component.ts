import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { PhysicalTreatment } from 'app/admin/physical-treatment/model/physical-treatment';
import { PhysicalTreatmentCategory } from 'app/admin/physical-treatment/model/physical-treatment.category';
import { PhyTrCategoryService } from 'app/admin/physical-treatment/services/physical-treatment-category.service';
import { PhyTreatmentService } from 'app/admin/physical-treatment/services/physical-treatment.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  categoryForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { category: PhysicalTreatmentCategory },
    private formBuilder: FormBuilder,
    private categoryService: PhyTrCategoryService,
    private snackBar: MatSnackBar
  ) {
    this.categoryForm = this.formBuilder.group({
      phyCategoryName: [data.category.phyCategoryName, Validators.required],
      phyCategoryDesc: [data.category.phyCategoryDesc, Validators.required],
    });
  }

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

 /* onSubmit(): void {
    if (this.categoryForm.valid) {
      const updatedCategory: PhysicalTreatmentCategory = {
        categoryid: this.data.category.categoryid,
        phyCategoryName: this.categoryForm.value.phyCategoryName,
        phyCategoryDesc: this.categoryForm.value.phyCategoryDesc,
        physicalTreatments: this.data.category.physicalTreatments // Conserver les traitements existants
      };

      this.categoryService.updatePhyTrCategory(updatedCategory).subscribe(
        () => {
          this.showNotification(
            'snackbar-success',
            'Category updated successfully....!!!',
            'bottom',
            'center'
          );
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error updating category:', error);
          this.showNotification('error', 'Failed to update category', 'bottom', 'right');
        }
      );
    } else {
      this.showNotification('snackbar-warning', 'Please fill all required fields', 'bottom', 'right');
    }
  }*/
  onSubmit(): void {
    if (this.categoryForm.valid) {
      const updatedCategory: PhysicalTreatmentCategory = {
        categoryid: this.data.category.categoryid, // Vous pouvez récupérer l'ID de la catégorie existante
        phyCategoryName: this.categoryForm.value.phyCategoryName, // Récupérer le nom à partir du formulaire
        phyCategoryDesc: this.categoryForm.value.phyCategoryDesc, // Récupérer la description à partir du formulaire
        physicalTreatments: this.data.category.physicalTreatments // Conserver les traitements existants
      };
  
      this.categoryService.updatePhyTrCategory(updatedCategory).subscribe(
        () => {
          this.showNotification(
            'snackbar-success',
            'Category updated successfully....!!!',
            'bottom',
            'center'
          );
          this.dialogRef.close('updated'); // Envoyer un signal pour indiquer que la mise à jour est effectuée
        },
        (error) => {
          console.error('Error updating category:', error);
          this.showNotification('error', 'Failed to update category', 'bottom', 'right');
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
}
