import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllergyService } from '../services/allergy.service';
import { Allergy } from '../model/allergy';
import { MatDialog } from '@angular/material/dialog';
import { EditAllergyComponent } from './dialogs/edit-allergy/edit-allergy.component';

@Component({
  selector: 'app-view-details-allergy',
  templateUrl: './view-details-allergy.component.html',
  styleUrls: ['./view-details-allergy.component.scss']
})
export class ViewDetailsAllergyComponent implements OnInit {
  public allergy: Allergy | undefined;
  public isLoading = true;
  isInputDisabled: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private allergyService: AllergyService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    
    this.getAllergyDetails();
  }

  getAllergyDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.allergyService.getAllergyById(Number(id)).subscribe(
        (allergy: Allergy) => {
          this.allergy = allergy;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching allergy details:', error);
          this.isLoading = false;
        }
      );
    }
  }
  
  openUpdateModal(): void {
    const dialogRef = this.dialog.open(EditAllergyComponent, {
      width: '600px',
      height: '650px',
      data: { allergy: this.allergy } // Pass allergy data to the modal
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle any actions after modal is closed, such as refreshing allergy details
      this.getAllergyDetails();
      this.isLoading = true;
    });
  }
}

  /*ngOnInit(): void {
    this.route.params.subscribe(params => {
      const allergyId = +params['id'];
      console.log('Allergy ID:', allergyId);

      this.allergyService.getAllergyById(allergyId).subscribe(
        (data: Allergy) => {
          this.allergy = data;
          console.log('Allergy details:', this.allergy);
          this.isLoading = false;
        },
        error => {
          console.error('Error fetching allergy details:', error);
          this.isLoading = false;
        }
      );
    });
  }
  getSymptomNames(symptoms: any[]): string {
    if (!symptoms) {
      return '';
    }
    return symptoms.map(symptom => symptom.symptomName).join(', ');
  }
  openEditModal(allergy: Allergy): void {
    console.log('Editing allergy:', allergy);
    // Vous devrez peut-être ajuster cette partie en fonction de la manière dont vous récupérez les symptômes
    this.symptomService.getAllSymptoms().subscribe(symptoms => {
      const dialogRef = this.dialog.open(EditAllergyComponent, {
        width: '600px',
        data: {
          allergy: allergy,
          symptoms: symptoms // Passer les symptômes récupérés au composant de modification
        }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        console.log('The edit dialog was closed');
        // Traiter les données retournées par le modal si nécessaire
      });
    });
  }
  
  
}*/
