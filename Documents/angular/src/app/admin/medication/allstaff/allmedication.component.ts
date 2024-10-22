import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MedicationService } from './medication.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Medication } from './medication.model';
import { DataSource } from '@angular/cdk/collections';
import { FormDialogComponent } from './dialog/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './dialog/delete/delete.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { Direction } from '@angular/cdk/bidi';
import {
  TableExportUtil,
  TableElement,
  UnsubscribeOnDestroyAdapter,
} from '@shared';
import { MedicationResponse } from '../MedicationResponse';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-allmedication',
  templateUrl: './allmedication.component.html',
  styleUrls: ['./allmedication.component.scss'],
})
export class AllMedicationComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  displayedColumns = [
    'medicationCode',
    'medicationName',
    'medicationType',
    'medicationStrength',
    'medicationDosageForm',
    'ingredients',
    'actions',
  ];
  dataSource: MedicationResponse[] = []; 
  originalDataSource: MedicationResponse[] = [];
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public medicationService: MedicationService,
    private snackBar: MatSnackBar
  ) {
    super();
  }
  
  ngOnInit():void {

    this.medicationService.getAllMedications().subscribe(data =>{
      this.originalDataSource =data;
      this.dataSource =data;
    });
  }
  getAllMedications(): void {
    this.medicationService.getAllMedications().subscribe((data: MedicationResponse[]) => {
      console.log(data);
      this.dataSource = data; // Affecter les ingrédients reçus à la source de données
    }, (error: any) => {
      this.snackBar.open('Erreur lors du chargement des ingrédients', 'Ok', {
        duration: 2000,
      });
    });
  }

  deleteMedication(medicationKy: number): void {
    this.medicationService.deleteMedication(medicationKy).subscribe({
      next: () => {
        console.log('Medicament supprimé avec succès.');
        this.dataSource = this.dataSource.filter(medication => medication.medicationKy !== medicationKy);
        alert('Medication deleted successfully');
      },
      error: (error: HttpErrorResponse) => {
        console.error('Une erreur s\'est produite lors de la suppression de medicament:', error);
      }
    });
  }

  openEditDialog(row: any): void {
    // Ouvrir la boîte de dialogue
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '600px', 
      data: { medication: row, medicationKy: row.medicationKy } 
    });
  
    // Souscrire à l'événement après la fermeture de la boîte de dialogue
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog box is closed');
      if (result) {
        // Rechargez les données pour refléter les mises à jour dans le tableau
        this.getAllMedications();
      }
    });
  }
  refresh(){
    this.getAllMedications();
  }

  search(filterValue: string): void {
    if (filterValue.trim()) {
      this.dataSource = this.originalDataSource.filter(medication =>
        medication.medicationName.toLowerCase().includes(filterValue.toLowerCase()) ||
        medication.medicationCode.toLowerCase().includes(filterValue.toLowerCase())
      );
    } else {
      this.dataSource = this.originalDataSource; // Reset to original data on empty search
    }
  }
  exportExcel(): void {
    const exportData = this.dataSource.map(medication => ({
      'Medication Code': medication.medicationCode,
      'Medication Name': medication.medicationName,
      'Medication Type': medication.medicationType,
      'Medication Strength': medication.medicationStrength,
      'Medication Dosage Form': medication.medicationDosageForm,
      'Ingredients': medication.ingredients.join(', '), // Si ingredients est un tableau de chaînes
      // 'Ingredients': medication.ingredients.map(ingredient => ingredient.name).join(', '), // Si ingredients est un tableau d'objets avec une propriété 'name'
    }));
    
    TableExportUtil.exportToExcel(exportData, 'medication');
  }
  
  
}
