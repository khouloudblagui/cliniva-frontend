import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { PhysicalTreatmentCategory } from 'app/admin/physical-treatment/model/physical-treatment.category';
import { PhyTrCategoryService } from 'app/admin/physical-treatment/services/physical-treatment-category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  treatmentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private phyTrCategoryService: PhyTrCategoryService,
    public dialogRef: MatDialogRef<AddCategoryComponent>
  ) {
    this.treatmentForm = this.formBuilder.group({
      phyCategoryName: ['', Validators.required],
      phyCategoryDesc: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.treatmentForm.valid) {
      const categoryData: PhysicalTreatmentCategory = this.treatmentForm.value;
      this.phyTrCategoryService.addPhyTrCategory(categoryData).subscribe(() => {
        console.log('Category added successfully');
        this.dialogRef.close();
        this.showNotification(
          'snackbar-success',
          'Category Added Successfully',
          'bottom',
          'center'
        );
      }, error => {
        console.error('Error adding category:', error);
        this.showNotification('error', 'Failed to add category', 'bottom', 'right');
      });
    } else {
      this.showNotification('snackbar-warning', 'Please fill all required fields', 'bottom', 'right');
    }
  }

  onCancel(): void {
    this.dialogRef.close();
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