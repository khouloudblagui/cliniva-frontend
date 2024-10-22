import { Component } from '@angular/core';
import { AdverseEffect } from '../model/vaccination';
import { ActivatedRoute } from '@angular/router';
import { AdverseEffectService } from '../services/adverse-effect.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UpdateAdverseEffectComponent } from './dialog/update-adverse-effect/update-adverse-effect.component';

@Component({
  selector: 'app-adverse-effect-details',
  templateUrl: './adverse-effect-details.component.html',
  styleUrls: ['./adverse-effect-details.component.scss']
})
export class AdverseEffectDetailsComponent {
  isInputDisabled: boolean = true;
  adverseEffect!: AdverseEffect;

  constructor(
    private route: ActivatedRoute,
    private adverseEffectService: AdverseEffectService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getVaccinationDetails();
  }

  getVaccinationDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.adverseEffectService.getSideEffectsById(id).subscribe(
        (adverseEffect: AdverseEffect) => {
          this.adverseEffect = adverseEffect;
        },
        (error) => {
          console.error('Error fetching vaccination details:', error);
        }
      );
    }
  }

  openUpdateModal() {
    const dialogRef = this.dialog.open(UpdateAdverseEffectComponent, {
    width: '600px',
    height: '650px',
    data: { adverseEffect: this.adverseEffect } // Pass vaccination data to the modal
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    // Handle any actions after modal is closed, such as refreshing vaccination details
    this.getVaccinationDetails();
  });
}

}
