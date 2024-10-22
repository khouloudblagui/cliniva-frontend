import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BioAnalysis } from '../model/bioanalysis';
import { ActivatedRoute } from '@angular/router';
import { BioanalysisService } from '../service/bioanalysis.service';
import { UpdatebioanalysisComponent } from '../bioanalysis-list/dialog/updatebioanalysis/updatebioanalysis.component';


@Component({
  selector: 'app-bioanalysis-details',
  templateUrl: './bioanalysis-details.component.html',
  styleUrls: ['./bioanalysis-details.component.scss']
})
export class BioanalysisDetailsComponent {
 
  isInputDisabled: boolean = true;
  bioanalysis!: BioAnalysis;
  public isLoading = true;

  constructor(
    public route: ActivatedRoute,
    public bioanalysisService: BioanalysisService,
    public dialog: MatDialog,
    
  ) { }
  
  ngOnInit(): void {
    this.getBioanalysisDetails();
    
  }

  getBioanalysisDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bioanalysisService.getAnalysisById(id).subscribe(
        (analysbio: BioAnalysis) => {
          this.bioanalysis = analysbio;
        },
        (error) => {
          console.error('Error fetching vaccination details:', error);
        }
      );
    }
  }
  
  openUpdateModal(bioanalysis: BioAnalysis): void {
    console.log('Editing analys:', bioanalysis);
    const dialogRef = this.dialog.open(UpdatebioanalysisComponent, {
    width: '600px',
    height: '650px',
    data: { bioanalysis: bioanalysis } // Pass vaccination data to the modal
    
  });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The edit dialog was closed');
      // Traiter les données retournées par le modal si nécessaire
      this.isLoading = true;
    });
  }

 
}
