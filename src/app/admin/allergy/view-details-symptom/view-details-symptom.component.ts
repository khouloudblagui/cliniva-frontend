import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SymptomService } from '../services/symptoms.service';
import { Symptoms } from '../model/symptoms';
import { Allergy } from '../model/allergy';
import { AllergyService } from '../services/allergy.service';
import { EditSymptomComponent } from './dialogs/edit-symptom/edit-symptom.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-view-details-symptom',
  templateUrl: './view-details-symptom.component.html',
  styleUrls: ['./view-details-symptom.component.scss']
})
export class ViewDetailsSymptomComponent implements OnInit {
  isInputDisabled: boolean = true;
  public symptoms: Symptoms | undefined;
  public isLoading = true;
  public associatedAllergies: Allergy[] = [];

  constructor(
    private route: ActivatedRoute,
    private symptomService: SymptomService,
    private allergyService: AllergyService,
    private dialog: MatDialog
    
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const symptomId = +params['id'];

      // Fetch Symptom details
      this.symptomService.getSymptomById(symptomId).subscribe(
        (data: Symptoms) => {
          this.symptoms = data;
          console.log('Symptom details:', this.symptoms);
          //this.isLoading = true;

          // Fetch associated Allergies
          this.allergyService.getAllAllergies().subscribe(
            (allergies: Allergy[]) => {
              // Filter allergies associated with this Symptom
              this.associatedAllergies = allergies.filter(allergy => allergy.symptoms.some(symptom => symptom.symptomKy === symptomId));
              console.log('Associated Allergies:', this.associatedAllergies);
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
  openEditModal(symptom: Symptoms): void {
    console.log('Editing symptom:', symptom);
    const dialogRef = this.dialog.open(EditSymptomComponent, {
      width: '600px',
      data: {
        symptom: symptom // Passer le symptôme à modifier au composant de modification
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The edit dialog was closed');
      
      // Recharger les données après la fermeture du dialogue de modification
      this.ngOnInit();       
    });
  }
  
 
}
