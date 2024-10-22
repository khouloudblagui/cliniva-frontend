import { Component, OnInit  } from '@angular/core';
import { PhysicalTreatment } from '../model/physical-treatment';
import { ActivatedRoute } from '@angular/router';
import { PhyTreatmentService } from '../services/physical-treatment.service';
import { MatDialog } from '@angular/material/dialog';
import { EditPhytreatmentComponent } from './dialogs/edit-phytreatment/edit-phytreatment.component';

@Component({
  selector: 'app-view-details-phy-treatment',
  templateUrl: './view-details-phy-treatment.component.html',
  styleUrls: ['./view-details-phy-treatment.component.scss']
})
export class ViewDetailsPhyTreatmentComponent implements OnInit {
  public physicalTreatment: PhysicalTreatment | undefined;
  public isLoading = true;
  isInputDisabled: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private phyTreatmentService: PhyTreatmentService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // Appeler la méthode pour récupérer les détails du traitement physique
    this.getPhysicalTreatmentDetails();
  }

  // Méthode pour récupérer les détails du traitement physique
  getPhysicalTreatmentDetails(): void {
    // Récupérer l'ID du traitement physique depuis les paramètres de l'URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Afficher l'ID dans la console pour le suivi
      console.log('Physical treatment ID:', id);
      
      // Appeler le service pour récupérer les détails du traitement physique par son ID
      this.phyTreatmentService.getTreatmentById(Number(id)).subscribe(
        // Callback en cas de succès
        (treatment: PhysicalTreatment) => {
          // Assigner les détails du traitement physique récupérés à la variable du composant
          this.physicalTreatment = treatment;
          // Indiquer que le chargement est terminé
          this.isLoading = false;
          // Afficher les détails du traitement physique dans la console pour le suivi
          console.log('Physical treatment details:', this.physicalTreatment);
        },
        // Callback en cas d'erreur
        (error) => {
          // Afficher l'erreur dans la console
          console.error('Error fetching physical treatment details:', error);
          // Indiquer que le chargement est terminé même en cas d'erreur
          this.isLoading = false;
        }
      );
    }
  }
  openUpdateModal(): void {
    // Ouvrir le dialogue de modification avec les détails du traitement physique
    const dialogRef = this.dialog.open(EditPhytreatmentComponent, {
      width: '600px',
      height: '650px',
      data: { physicalTreatment: this.physicalTreatment } // Passer les données du traitement physique au modal
    });
  
    // S'abonner à l'événement de fermeture du dialogue
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Gérer les actions après la fermeture du dialogue, telles que la mise à jour des détails du traitement physique
      this.getPhysicalTreatmentDetails();
      this.isLoading = true;
    });
  }
  
}

