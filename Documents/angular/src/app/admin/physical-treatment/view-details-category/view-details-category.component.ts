import { Component, OnInit } from '@angular/core';
import { PhysicalTreatmentCategory } from '../model/physical-treatment.category';
import { ActivatedRoute } from '@angular/router';
import { PhyTrCategoryService } from '../services/physical-treatment-category.service';
import { MatDialog } from '@angular/material/dialog';
import { EditCategoryComponent } from './dialogs/edit-category/edit-category.component';
import { PhysicalTreatment } from '../model/physical-treatment';
import { PhyTreatmentService } from '../services/physical-treatment.service';

@Component({
  selector: 'app-view-details-category',
  templateUrl: './view-details-category.component.html',
  styleUrls: ['./view-details-category.component.scss']
})
export class ViewDetailsCategoryComponent implements OnInit {
  isInputDisabled: boolean = true;
  public physicalTreatmentCategory: PhysicalTreatmentCategory | undefined;
  public isLoading = false;
  public associatedTreatment: PhysicalTreatment[] = [];// Liste des traitements associés
  
  constructor(
    private route: ActivatedRoute,
    private phyTrCategoryService: PhyTrCategoryService,
    private phyTreatmentService: PhyTreatmentService,
    private dialog: MatDialog
  ) { }

 /* ngOnInit(): void {
    this.getPhysicalTreatmentCategoryDetails();
    
  }*/
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const categoryId = +params['id'];

      // Fetch Symptom details
      this.phyTrCategoryService.getPhyTrCategoryById(categoryId).subscribe(
        (data: PhysicalTreatmentCategory) => {
          this.physicalTreatmentCategory = data;
          console.log('physicalTreatmentCategory details:', this.physicalTreatmentCategory);
          this.isLoading = false; // Définir isLoading sur false lorsque les données sont récupérées
          // Fetch associated Allergies
          this.phyTreatmentService.getAllTreatments().subscribe(
            (phytreatment: PhysicalTreatment[]) => {
              // Filter allergies associated with this Symptom
              this.associatedTreatment = phytreatment.filter(allergy => allergy.physicalTreatmentCategory.categoryid === categoryId);
              // Récupérer les traitements associés à la catégorie physique
              console.log('associatedTreatment:', this.associatedTreatment);
            },
            error => {
              console.error('Error fetching associated allergies:', error);
            }
          );
        },
        error => {
          console.error('Error fetching symptom details:', error);
          this.isLoading = false;
        }
      );
    });
  }

  

  openUpdateModal(): void {
    const dialogRef = this.dialog.open(EditCategoryComponent, {
      width: '600px',
      height: '400px',
      data: { category: this.physicalTreatmentCategory }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result === 'updated') {
        this.updateData(); // Appeler la méthode pour mettre à jour les données
      }
    });
  }
  
  updateData(): void {
    this.isLoading = true;
    if (this.physicalTreatmentCategory) {
      const categoryId = this.physicalTreatmentCategory.categoryid;
      this.phyTrCategoryService.getPhyTrCategoryById(categoryId).subscribe(
        (data: PhysicalTreatmentCategory) => {
          this.physicalTreatmentCategory = data;
          console.log('physicalTreatmentCategory details:', this.physicalTreatmentCategory);
          this.isLoading = false;
          // Fetch associated Treatments
          this.phyTreatmentService.getAllTreatments().subscribe(
            (phytreatment: PhysicalTreatment[]) => {
              this.associatedTreatment = phytreatment.filter(allergy => allergy.physicalTreatmentCategory.categoryid === categoryId);
              console.log('associatedTreatment:', this.associatedTreatment);
            },
            error => {
              console.error('Error fetching associated treatments:', error);
            }
          );
        },
        error => {
          console.error('Error fetching category details:', error);
          this.isLoading = false;
        }
      );
    } else {
      console.error('Physical treatment category is undefined.');
    }
  }
  
  
  
  
}