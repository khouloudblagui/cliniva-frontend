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
import { Allergy } from '../model/allergy';
import { AllergyService } from '../services/allergy.service';
import { AddAllergyComponent } from './dialog/add-allergy/add-allergy.component';
import { DeleteAllergyComponent } from './dialog/delete-allergy/delete-allergy.component';
import { EditAllergyComponent } from '../view-details-allergy/dialogs/edit-allergy/edit-allergy.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-allergylist',
  templateUrl: './allergylist.component.html',
  styleUrls: ['./allergylist.component.scss']
})
export class AllergylistComponent implements OnInit {

  displayedColumns: string[] = ['select', 'allergyKy', 'allergyName', 'allergyType', 'allergySeverity', 'allergyDesc','allergySymptoms', 'actions'];
  dataSource!: MatTableDataSource<Allergy>;
  selection = new SelectionModel<Allergy>(true, []);
  exampleDatabase?:AllergyService

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter?: ElementRef;

  public allergies: Allergy[] = [];
  public searchTerm: string = '';
  constructor(
    private allergyService: AllergyService,
    private dialog: MatDialog,
    public httpClient: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.loadData(); // Initialise dataSource ici
    this.dataSource = new MatTableDataSource<Allergy>([]);
    this.loadData();
   
    // Autres appels de méthodes ici...
  }
  refresh() {
    this.loadData();
  }
  public loadData(): void {
    this.allergyService.getAllAllergies().subscribe((data: Allergy[]) => {
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
// Méthode pour ouvrir la modal d'ajout d'allergie
openAddModal(): void {
  const dialogRef = this.dialog.open(AddAllergyComponent, {
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

  
  public getAllAllergies(): void {
    this.allergyService.getAllAllergies().subscribe(
      (response: Allergy[]) => {
        this.allergies = response;
        console.log(this.allergies);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public searchAllergies(key: string): void {
    console.log(key); // Affiche la clé de recherche dans la console
    if (key.trim() !== '') { // Vérifie si la clé de recherche n'est pas vide
      const results: Allergy[] = [];
      for (const allergy of this.allergies) {
        if (allergy.allergyName.toLowerCase().includes(key.toLowerCase())
          || allergy.allergyType.toLowerCase().includes(key.toLowerCase())
          || allergy.allergySeverity.toLowerCase().includes(key.toLowerCase())) {
          results.push(allergy);
        }
      }
      this.allergies = results; // Met à jour la liste des allergies avec les résultats de la recherche
    } else {
      this.getAllAllergies(); // Si la clé de recherche est vide, affiche toutes les allergies
    }
  }
  

  openDeleteModal(allergy: Allergy): void {
    const dialogRef = this.dialog.open(DeleteAllergyComponent, {
      width: '400px',
      data: allergy // Passer l'allergie sélectionnée au dialogue de suppression
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Delete modal closed with result:', result);
      if (result === true) {
        // Supprimer l'allergie de la base de données
        this.allergyService.removeAllergy(allergy.allergyKy).subscribe(() => {
          console.log('Allergy successfully removed from the database');
          // Supprimer l'allergie du tableau du modèle
          this.allergies = this.allergies.filter(a => a !== allergy);
          this.showNotification(
            'snackbar-success',
            ' Allergy Delete Successfully...!!!',
            'bottom',
            'center'
          );
          this.refresh();
        }, (error) => {
          console.error('Error removing allergy from the database:', error);
          this.showNotification('error', 'Failed to delete allergy', 'bottom', 'right');
          // Afficher un message d'erreur ou gérer l'erreur autrement
        });
      }
    });
  }
  
 
  
  onCancelClick(): void {
    console.log('Delete operation canceled.');
  }

  
  /*viewAllergyDetails(allergy: Allergy): void {
    this.router.navigate(['/admin/allergy/view/details/allergy', allergy.allergyKy]);
  }*/
  viewAllergyDetails(allergy: Allergy): void {
    // Navigate to the details page with the ID of the selected vaccine
    this.router.navigate(['/admin/allergy/view/details/allergy', allergy.allergyKy]);
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
  exportExcel() {
    const exportData: Partial<Record<string, any>>[] = this.dataSource.filteredData.map((allergy) => ({
      'Allergy Name': allergy.allergyName,
      'Allergy Type': allergy.allergyType,
      'Allergy Severity': allergy.allergySeverity,
      'Allergy Description': allergy.allergyDesc,
      'Allergy Symptoms': allergy.allergySymptoms
    }));
  
    TableExportUtil.exportToExcel(exportData, 'allergy');
  }
}



