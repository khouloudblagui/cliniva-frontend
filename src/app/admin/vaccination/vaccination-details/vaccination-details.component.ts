import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VaccinationService } from '../services/vaccination.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Vaccination } from '../model/vaccination';
import { ActivatedRoute } from '@angular/router';
import { UpdateVaccinationComponent } from './dialog/update-vaccination/update-vaccination.component';

@Component({
  selector: 'app-vaccination-details',
  templateUrl: './vaccination-details.component.html',
  styleUrls: ['./vaccination-details.component.scss']
})
export class VaccinationDetailsComponent implements OnInit{

  isInputDisabled: boolean = true;
  vaccination!: Vaccination;

  constructor(
    private route: ActivatedRoute,
    private vaccinationService: VaccinationService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getVaccinationDetails();
  }

  getVaccinationDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.vaccinationService.getVaccinationById(id).subscribe(
        (vaccination: Vaccination) => {
          this.vaccination = vaccination;
        },
        (error) => {
          console.error('Error fetching vaccination details:', error);
        }
      );
    }
  }

  openUpdateModal() {
    const dialogRef = this.dialog.open(UpdateVaccinationComponent, {
    width: '600px',
    height: '650px',
    data: { vaccination: this.vaccination } // Pass vaccination data to the modal
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    // Handle any actions after modal is closed, such as refreshing vaccination details
    this.getVaccinationDetails();
  });
}

}
