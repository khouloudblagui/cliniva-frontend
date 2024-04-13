import { Component, ElementRef, ViewChild } from '@angular/core';
import { AdverseEffect } from '../model/vaccination';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { VaccinationService } from '../services/vaccination.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';
import { DeleteAdverseEffectComponent } from './dialog/delete-adverse-effect/delete-adverse-effect.component';
import { AddAdverseEffectComponent } from './dialog/add-adverse-effect/add-adverse-effect.component';
import { AdverseEffectService } from '../services/adverse-effect.service';
import { TableExportUtil } from '@shared';

@Component({
  selector: 'app-adverse-effect-list',
  templateUrl: './adverse-effect-list.component.html',
  styleUrls: ['./adverse-effect-list.component.scss']
})
export class AdverseEffectListComponent {

  displayedColumns: string[] = ['select', 'idAdverseEffect', 'adverseEffectName', 'adverseEffectSeverity','adverseEffectDesc', 'actions'];
  dataSource!: MatTableDataSource<AdverseEffect>;
  selection = new SelectionModel<AdverseEffect>(true, []);
  exampleDatabase?:VaccinationService

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter?: ElementRef;


  symptoms: AdverseEffect[] = [];

  constructor(
    private vaccinationService: AdverseEffectService,
     private dialog: MatDialog,
    public httpClient: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
     ) { }

  ngOnInit(): void {
    this.getAllSymptoms();
    this.loadData(); // Initialise dataSource ici
    this.dataSource = new MatTableDataSource<AdverseEffect>([]);
    this.loadData();
  }
  refresh() {
    this.loadData();
  }
  public loadData(): void {
    this.vaccinationService.getSideEffects().subscribe((data: AdverseEffect[]) => {
      this.dataSource = new MatTableDataSource(data); // Initialise dataSource avec les données
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
  getAllSymptoms(): void {
    this.vaccinationService.getSideEffects().subscribe(
      (data: AdverseEffect[]) => {
        this.symptoms = data;
        console.log('AdverseEffect:', this.symptoms); // Afficher les symptômes sur la console
      },
      (error) => {
        console.error('Error fetching AdverseEffect:', error);
      }
    );
  }

  addSymptom(): void {
    
  }

  removeSymptom(id: number): void {
    
  }
  
  openAddModal(): void {
    const dialogRef = this.dialog.open(AddAdverseEffectComponent, {
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
  
  openDeleteModal(vaccin: AdverseEffect): void {
    const dialogRef = this.dialog.open(DeleteAdverseEffectComponent, {
      width: '400px',
      data: vaccin // Passer l'allergie sélectionnée au dialogue de suppression
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Delete modal closed with result:', result);
      if (result === true) {
        // Supprimer l'allergie de la base de données
        this.vaccinationService.removeSideEffects(vaccin.idAdverseEffect).subscribe(() => {
          console.log('Adverse Effect successfully removed from the database');
          // Supprimer l'allergie du tableau du modèle
          this.symptoms = this.symptoms.filter(a => a !== vaccin); // Assuming only one record is deleted
          this.showNotification(
            'snackbar-danger',
            ' Record Delete Successfully...!!!',
            'bottom',
            'center'
          );this.refresh();
        }, (error) => {
          console.error('Error removing allergy from the database:', error);
          // Afficher un message d'erreur ou gérer l'erreur autrement
        });
      } 
    });
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

  openDetails(vaccine: AdverseEffect): void {
    // Navigate to the details page with the ID of the selected vaccine
    this.router.navigate(['/admin/vaccination/adverseEffect-details', vaccine.idAdverseEffect]);
  }
  exportExcel() {
    const exportData: Partial<Record<string, any>>[] = this.dataSource.filteredData.map((vaccination) => ({
      'Adverse Effect Name': vaccination.adverseEffectName,
      'Adverse Effect Severity': vaccination.adverseEffectSeverity,
      'Adverse Effect Desc': vaccination.adverseEffectDesc,
      'Vaccinations': vaccination.vaccinations?.map(effect => effect.vaccineLabel).join(', '), // Joining side effect names
    }));
  
    TableExportUtil.exportToExcel(exportData, 'vaccinations');
  }
}
