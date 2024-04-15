import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { PhysicalTreatment } from 'app/admin/physical-treatment/model/physical-treatment';
import { PhysicalTreatmentCategory } from 'app/admin/physical-treatment/model/physical-treatment.category';
import { PhyTrCategoryService } from 'app/admin/physical-treatment/services/physical-treatment-category.service';
import { PhyTreatmentService } from 'app/admin/physical-treatment/services/physical-treatment.service';

@Component({
  selector: 'app-edit-phytreatment',
  templateUrl: './edit-phytreatment.component.html',
  styleUrls: ['./edit-phytreatment.component.scss']
})
export class EditPhytreatmentComponent implements OnInit {
  treatmentForm: FormGroup;
  treatmentCategories: PhysicalTreatmentCategory[] = [];
  selectedCategory: PhysicalTreatmentCategory | null = null;
  treatment: PhysicalTreatment | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private treatmentService: PhyTreatmentService,
    private treatmentCategoryService: PhyTrCategoryService,
    public dialogRef: MatDialogRef<EditPhytreatmentComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { physicalTreatment: PhysicalTreatment }
  ) {
    this.treatmentForm = this.formBuilder.group({
      phyTrName: ['', Validators.required],
      phyTrDuration: ['', Validators.required],
      phyTrNote: ['', Validators.required],
      phyTrDesc: ['', Validators.required],
      category: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
    this.loadTreatmentCategories();
    if (this.data.physicalTreatment) {
      this.treatment = this.data.physicalTreatment;
      this.treatmentForm.patchValue({
        phyTrName: this.treatment.phyTrName,
        phyTrDesc: this.treatment.phyTrDesc,
        phyTrDuration: this.treatment.phyTrDuration,
        phyTrNote: this.treatment.phyTrNote,
        category: this.treatment.physicalTreatmentCategory?.categoryid 
      });
      this.selectedCategory = this.treatment.physicalTreatmentCategory || null;
    }
  }

  loadTreatmentCategories(): void {
    this.treatmentCategoryService.getAllPhyTrCategories().subscribe(
      (data: PhysicalTreatmentCategory[]) => {
        this.treatmentCategories = data;
      },
      (error) => {
        console.error('Error loading treatment categories:', error);
      }
    );
  }

  onSubmit() {
    if (this.treatmentForm.valid && this.selectedCategory) {
      console.log('Form is valid. Submitting...');
  
      const updatedTreatment: PhysicalTreatment = {
        idtreatment: this.treatment ? this.treatment.idtreatment : 0,
        phyTrName: this.treatmentForm.value.phyTrName,
        phyTrDuration: this.treatmentForm.value.phyTrDuration,
        phyTrNote: this.treatmentForm.value.phyTrNote,
        phyTrDesc: this.treatmentForm.value.phyTrDesc,
        physicalTreatmentCategory: this.selectedCategory
      };
  
      console.log('Updated treatment:', updatedTreatment);
  
      const saveOrUpdateOperation = this.treatment ?
        this.treatmentService.updateTreatment(updatedTreatment.idtreatment, updatedTreatment) :
        this.treatmentService.saveTreatment(updatedTreatment);
  
      saveOrUpdateOperation.subscribe(
        () => {
          const message = this.treatment ? 'updated' : 'saved';
          this.showNotification(
            'snackbar-success',
            `Physical Treatment ${message} successfully.`,
            'bottom',
            'center'
          );
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error saving/updating treatment:', error);
          const message = this.treatment ? 'update' : 'save';
          this.showNotification(
            'snackbar-error',
            `Failed to ${message} Physical Treatment. Please try again later.`,
            'bottom',
            'center'
          );
        }
      );
    } else {
      console.log('Form is invalid or category is not selected.');
      this.showNotification('snackbar-warning', 'Please fill all required fields.', 'bottom', 'right');
    }
  }
  
  
  onSelectCategory(categoryId: number): void {
    // Log pour vérifier si la catégorie est sélectionnée
    console.log('Selected category:', categoryId);
    this.selectedCategory = this.treatmentCategories.find(category => category.categoryid === categoryId) || null;
  }
  
  showNotification(
    colorName: string,
    text: string,
    placementFrom: string,
    placementAlign: string
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom as MatSnackBarVerticalPosition,
      horizontalPosition: placementAlign as MatSnackBarHorizontalPosition,
      panelClass: colorName,
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
