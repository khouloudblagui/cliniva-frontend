
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { Direction } from '@angular/cdk/bidi';
import {
  TableExportUtil,
  TableElement,
  UnsubscribeOnDestroyAdapter,
} from '@shared';
import { formatDate } from '@angular/common';
import { VaccinationService } from '../services/vaccination.service';
import { Vaccination } from '../model/vaccination';
import { MatTableDataSource } from '@angular/material/table';
import { AddVaccinationComponent } from './dialog/add-vaccination/add-vaccination.component';
import { DeleteVaccinationComponent } from './dialog/delete-vaccination/delete-vaccination.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-vaccination-list',
  templateUrl: './vaccination-list.component.html',
  styleUrls: ['./vaccination-list.component.scss']
})
export class VaccinationListComponent implements OnInit
{

  displayedColumns: string[] = ['select','idVaccination', 'vaccineLabel', 'vaccineType','vaccineMedication', 'vaccineICD10Code', 'actions'];
  dataSource!: MatTableDataSource<Vaccination>;
  selection = new SelectionModel<Vaccination>(true, []);
  exampleDatabase?:VaccinationService

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter?: ElementRef;

public vaccinations: Vaccination[] = [];

constructor(
  public httpClient: HttpClient,
  public dialog: MatDialog,
  public vaccinationService: VaccinationService,
  private snackBar: MatSnackBar,
  private router: Router
) {}


ngOnInit() {
  this.loadData();
  this.getAllVaccination();
}
refresh() {
  this.loadData();
}
addNew() {  
}
editCall(row: any) {
}
deleteItem(row: any) {
}

masterToggle() {
  this.isAllSelected() ?
    this.selection.clear() :
    this.dataSource.data.forEach(row => this.selection.select(row));
}

isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
}

public loadData() {
  this.vaccinationService.getVaccination().subscribe((data: Vaccination[]) => {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  });

  // Filter data based on input
  fromEvent(this.filter?.nativeElement, 'keyup')
    .pipe(
      map((event: any) => event.target.value),
      debounceTime(300),
      distinctUntilChanged()
    )
    .subscribe((text: string) => {
      this.dataSource.filter = text.trim().toLowerCase();
    });
}


exportExcel() {
  const exportData: Partial<Record<string, any>>[] = this.dataSource.filteredData.map((vaccination) => ({
    'Vaccination Name': vaccination.vaccineLabel,
    'Vaccination Type': vaccination.vaccineType,
    'Manufacturer': vaccination.vaccineManufacturer,
    'Medication': vaccination.vaccineMedication.medicationName,
    'ICD10 Code': vaccination.vaccineICD10Code.name,
    'Side Effects': vaccination.sideEffects.map(effect => effect.adverseEffectName).join(', '), // Joining side effect names
  }));

  TableExportUtil.exportToExcel(exportData, 'vaccinations');
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

public getAllVaccination(): void {
  this.vaccinationService.getVaccination().subscribe(
    (response: Vaccination[]) => {
      this.vaccinations = response;
      console.log(this.vaccinations);
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

openAddModal(): void {
  const dialogRef = this.dialog.open(AddVaccinationComponent, {
    width: '600px', // Définir la largeur de la modal selon vos besoins
    height: '650px',
    // Autres configurations de la modal
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    // Traiter les données retournées par la modal si nécessaire
    this.refresh();
  });
}


openDeleteModal(vaccin: Vaccination): void {
  const dialogRef = this.dialog.open(DeleteVaccinationComponent, {
    width: '400px',
    data: vaccin // Passer l'allergie sélectionnée au dialogue de suppression
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('Delete modal closed with result:', result);
    if (result === true) {
      // Supprimer l'allergie de la base de données
      this.vaccinationService.removeVaccination(vaccin.idVaccination).subscribe(() => {
        console.log('Allergy successfully removed from the database');
        // Supprimer l'allergie du tableau du modèle
        this.vaccinations = this.vaccinations.filter(a => a !== vaccin); // Assuming only one record is deleted
        this.showNotification(
          'snackbar-danger',
          ' Record Delete Successfully...!!!',
          'bottom',
          'center'
        );
        this.refresh();
      }, (error) => {
        console.error('Error removing allergy from the database:', error);
        // Afficher un message d'erreur ou gérer l'erreur autrement
      });
    }
  });
}
openDetails(vaccine: Vaccination): void {
  // Navigate to the details page with the ID of the selected vaccine
  this.router.navigate(['/admin/vaccination/details', vaccine.idVaccination]);
}
}
