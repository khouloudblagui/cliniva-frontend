import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PhysicalTreatment } from '../model/physical-treatment';
import { PhyTreatmentService } from '../services/physical-treatment.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from './dialogs/add/add.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DeleteComponent } from './dialogs/delete/delete.component';
import { Router } from '@angular/router';
import { TableExportUtil } from '@shared';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-physical-treatment-list',
  templateUrl: './physical-treatment-list.component.html',
  styleUrls: ['./physical-treatment-list.component.scss']
})
export class PhysicalTreatmentListComponent implements OnInit {
  treatments: PhysicalTreatment[] = [];
  dataSource!: MatTableDataSource<PhysicalTreatment>;
  selection = new SelectionModel<PhysicalTreatment>(true, []); // Assuming you're using a SelectionModel
  displayedColumns: string[] = ['idtreatment', 'phyTrName', 'phyTrDesc', 'phyTrDuration', 'phyTrNote', 'actions'];
  exampleDatabase?:PhyTreatmentService;
  //isTblLoading: boolean = false; // Define the property isTblLoading

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter?: ElementRef;

  constructor(private phyTreatmentService: PhyTreatmentService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,) { }

  ngOnInit(): void {
    this.getPhysicalTreatments();
    this.dataSource = new MatTableDataSource<PhysicalTreatment>([]);
    this.loadData();
  }
  refresh() {
    this.loadData();
  }

loadData(): void {
    this.phyTreatmentService.getAllTreatments().subscribe((data: PhysicalTreatment[]) => {
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

  getPhysicalTreatments(): void {
    console.log('Fetching physical treatments...');
    this.phyTreatmentService.getAllTreatments().subscribe({
      next: (data) => {
        console.log('Fetch successful!');
        this.treatments = data;
        this.dataSource.data = this.treatments; // Mise à jour de la source de données de la table
      },
      error: (error) => {
        console.error('An error occurred while fetching physical treatments:', error);
      }
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

  openAddModal(): void {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '600px', // Définir la largeur de la modal selon vos besoins
      height: '630px',
      // Autres configurations de la modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Traiter les données retournées par la modal si nécessaire
      this.refresh();
    });
  }
  openDeleteTreatmentModal(treatment: PhysicalTreatment): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '400px',
      data: treatment // Passer le traitement sélectionné au dialogue de suppression
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Delete modal closed with result:', result);
      if (result === true) {
        // Supprimer le traitement de la base de données
        this.phyTreatmentService.deleteTreatment(treatment.idtreatment).subscribe(() => {
          console.log('Treatment successfully removed from the database');
          // Supprimer le traitement du tableau du modèle
          this.treatments = this.treatments.filter(t => t !== treatment);
          this.dataSource.data = this.treatments; // Mise à jour de la source de données de la table
          this.showNotification(
            'snackbar-success',
            'Treatment Delete Successfully...!!!',
            'bottom',
            'center'
          );
          this.refresh();
        }, (error) => {
          console.error('Error removing treatment from the database:', error);
          this.showNotification('error', 'Failed to delete treatment', 'bottom', 'right');
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

  viewTreatmentDetails(treatment: PhysicalTreatment): void {
    // Navigate to the details page with the ID of the selected treatment
    this.router.navigate(['/admin/physical-treatment/view/details/physical-treatment', treatment.idtreatment]);
  }
  public searchPhysicalTreatments(key: string): void {
    console.log(key); // Affiche la clé de recherche dans la console
    if (key.trim() !== '') { // Vérifie si la clé de recherche n'est pas vide
      const results: PhysicalTreatment[] = [];
      for (const treatment of this.treatments) {
        if (treatment.phyTrName.toLowerCase().includes(key.toLowerCase())
          || treatment.phyTrDesc.toLowerCase().includes(key.toLowerCase())
          || treatment.phyTrDuration.toLowerCase().includes(key.toLowerCase())
          || treatment.phyTrNote.toLowerCase().includes(key.toLowerCase())) {
          results.push(treatment);
        }
      }
      this.dataSource.data = results; // Met à jour la source de données de la table avec les résultats de la recherche
    } else {
      this.getPhysicalTreatments(); // Si la clé de recherche est vide, affiche tous les traitements physiques
    }
  }
  exportExcel() {
    const exportData: Partial<Record<string, any>>[] = this.dataSource.filteredData.map((treatment) => ({
      'Treatment Name': treatment.phyTrName,
      'Treatment Description': treatment.phyTrDesc,
      'Treatment Duration': treatment.phyTrDuration,
      'Treatment Note': treatment.phyTrNote,
      // Utiliser les informations sur la catégorie du traitement
      'Category': treatment.physicalTreatmentCategory.phyCategoryName, // Par exemple, si vous voulez le nom de la catégorie
    }));
  
    TableExportUtil.exportToExcel(exportData, 'Physical Treatment');
  }
  
  
}
