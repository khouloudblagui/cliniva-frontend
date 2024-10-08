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

import { MatTableDataSource } from '@angular/material/table';
import { BioAnalysis } from '../model/bioanalysis';
import { BioanalysisService } from '../service/bioanalysis.service';
import { AddbioanalysisComponent } from './dialog/addbioanalysis/addbioanalysis.component';
import { DeletebioanalysisComponent } from './dialog/deletebioanalysis/deletebioanalysis.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-bioanalysis-list',
  templateUrl: './bioanalysis-list.component.html',
  styleUrls: ['./bioanalysis-list.component.scss']
})

  export class BioanalysisListComponent implements OnInit {
    displayedColumns: string[] = ['select','id', 'biologicalAnalysisName','biologicalAnalysisType', 'biologicalAnalysisDesc','biologicalAnalysisMeasurmentUnit', 'actions'];
  dataSource!: MatTableDataSource<BioAnalysis>;
  selection = new SelectionModel<BioAnalysis>(true, []);
  exampleDatabase?:BioanalysisService

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter?: ElementRef;

    public bioanalysise: BioAnalysis[] = [];
    constructor(
      
      public httpClient: HttpClient,
  public dialog: MatDialog,
  public bioanalysisService: BioanalysisService,
  private snackBar: MatSnackBar,
  private router: Router) { }
  
    ngOnInit(): void {
      this.getAllBioanalysis();
      this.loadData();
      
     
      // Autres appels de méthodes ici...
    }

    public loadData() {
      this.bioanalysisService.getAllBioanalysis().subscribe((data: BioAnalysis[]) => {
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
  
    
    public getAllBioanalysis(): void {
      this.bioanalysisService.getAllBioanalysis().subscribe(
        (response: BioAnalysis[]) => {
          this.bioanalysise = response;
          console.log(this.bioanalysise);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
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
    refresh() {
      this.loadData();
    }
  
    openAddModal(): void {
      const dialogRef = this.dialog.open(AddbioanalysisComponent, {
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

    openDeleteModal(bioanalys: BioAnalysis): void {
      const dialogRef = this.dialog.open(DeletebioanalysisComponent, {
        width: '400px',
        data: bioanalys // Passer le bioanalysis sélectionnée au dialogue de suppression
      });
    
      dialogRef.afterClosed().subscribe(result => {
        console.log('Delete modal closed with result:', result);
        if (result === true) {
          // Supprimer l'allergie de la base de données
          this.bioanalysisService.removeBioanalysis(bioanalys.id).subscribe(() => {
            console.log('BioAnalysis successfully removed from the database');
            // Supprimer l'allergie du tableau du modèle
            this.bioanalysise = this.bioanalysise.filter(a => a !== bioanalys);
            this.showNotification(
              'snackbar-danger',
              ' Record Delete Successfully...!!!',
              'bottom',
              'center'
            );
            this.refresh();
          }, (error) => {
            console.error('Error removing bioanalysis from the database:', error);
            // Afficher un message d'erreur ou gérer l'erreur autrement
          });
        }
      });
    }
  
    openDetails(analysbio: BioAnalysis): void {
      // Navigate to the details page with the ID of the selected vaccine
      this.router.navigate(['/admin/bioanalysis/bioanalysis-details', analysbio.id]);
    }
    // Autres méthodes ici...
    exportExcel() {
      const exportData: Partial<Record<string, any>>[] = this.dataSource.filteredData.map((bioanalysise) => ({
        'Analysis Name': bioanalysise.biologicalAnalysisName,
        'Analysis Type': bioanalysise.biologicalAnalysisType,
        'Analysis Desc': bioanalysise.biologicalAnalysisDesc,
        'Analysis Unit': bioanalysise.biologicalAnalysisMeasurmentUnit,
        'Analysis vaulemin': bioanalysise.biologicalAnalysisRefValueMin,
        'Analysis vaulemax': bioanalysise.biologicalAnalysisRefValueMax, 
      }));
    
      TableExportUtil.exportToExcel(exportData, 'bioanalysise');
    }  
  
}


