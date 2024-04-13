import { Component, ElementRef, ViewChild } from '@angular/core';
import { Symptoms } from '../model/symptoms';
import { SymptomService } from '../services/symptoms.service';
import { AddAllergyComponent } from '../allergylist/dialog/add-allergy/add-allergy.component';
import { MatDialog } from '@angular/material/dialog';
import { AddSymtomComponent } from './dialogs/add-symtom/add-symtom.component';
import { DeleteSymtomComponent } from './dialogs/delete-symtom/delete-symtom.component';
import { EditSymtomComponent } from './dialogs/edit-symtom/edit-symtom.component';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';
import { Router } from '@angular/router';
import { TableExportUtil } from '@shared';

@Component({
  selector: 'app-symptomslist',
  templateUrl: './symptomslist.component.html',
  styleUrls: ['./symptomslist.component.scss']
})
export class SymptomslistComponent {
  displayedColumns: string[] = ['select', 'symptomKy', 'symptomName', 'symptomDesc', 'actions'];
  dataSource!: MatTableDataSource<Symptoms>;
  selection = new SelectionModel<Symptoms>(true, []);
  exampleDatabase?:SymptomService

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter?: ElementRef;


  symptoms: Symptoms[] = [];
  newSymptom: Symptoms = { symptomName: '', symptomDesc: '' };
  criteria: string = ''; // Déclarer la propriété criteria

  constructor(
    private symptomService: SymptomService,
     private dialog: MatDialog,
    public httpClient: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
     ) { }

  ngOnInit(): void {
    this.getAllSymptoms();
    this.loadData(); // Initialise dataSource ici
    this.dataSource = new MatTableDataSource<Symptoms>([]);
    this.loadData();
  }
  refresh() {
    this.loadData();
  }
  public loadData(): void {
    this.symptomService.getAllSymptoms().subscribe((data: Symptoms[]) => {
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
    this.symptomService.getAllSymptoms().subscribe(
      (data: Symptoms[]) => {
        this.symptoms = data;
        console.log('Symptoms:', this.symptoms); // Afficher les symptômes sur la console
      },
      (error) => {
        console.error('Error fetching symptoms:', error);
      }
    );
  }

  addSymptom(): void {
    this.symptomService.addSymptom(this.newSymptom).subscribe(
      (data: Symptoms) => {
        console.log('Symptom added:', data);
        this.getAllSymptoms(); // Rechargez la liste des symptômes après l'ajout
      },
      (error) => {
        console.error('Error adding symptom:', error);
      }
    );
  }

  removeSymptom(id: number): void {
    this.symptomService.removeSymptom(id).subscribe(
      () => {
        console.log('Symptom removed successfully');
        this.getAllSymptoms(); // Rechargez la liste des symptômes après la suppression
      },
      (error) => {
        console.error('Error removing symptom:', error);
      }
    );
  }
  
  openAddModal(): void {
    const dialogRef = this.dialog.open(AddSymtomComponent, {
      width: '400px', // Définir la largeur de la modal selon vos besoins
      height: '400px',
      // Autres configurations de la modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Traiter les données retournées par la modal si nécessaire
      this.refresh();
    });
  }
  
  openDeleteModal(symptom: Symptoms): void {
    const dialogRef = this.dialog.open(DeleteSymtomComponent, {
      width: '400px',
      data: symptom // Passer le symptôme sélectionné au dialogue de suppression
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Delete modal closed with result:', result);
      if (result === true) {
        // Supprimer le symptôme de la base de données
        if (symptom && typeof symptom.symptomKy === 'number') {
          this.symptomService.removeSymptom(symptom.symptomKy).subscribe(() => {
            console.log('Symptom successfully removed from the database');
            // Supprimer le symptôme du tableau du modèle
            this.symptoms = this.symptoms.filter(s => s !== symptom);
            this.showNotification(
              'snackbar-success',
              ' Delete symtom Successfully...!!!',
              'bottom',
              'center'
            );
            this.refresh();
          }, (error) => {
            console.error('Error removing symptom from the database:', error);
            this.showNotification('error', 'Failed to delete symtom', 'bottom', 'right');
            // Afficher un message d'erreur ou gérer l'erreur autrement
          });
        } else {
          console.error('Symptom or symptomKy is undefined');
          
          // Gérer le cas où symptom ou symptomKy est undefined
        }
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

openEditModal(symptom: Symptoms): void {
  console.log('Editing symptom:', symptom);
  const dialogRef = this.dialog.open(EditSymtomComponent, {
    width: '600px', // Définir la largeur du modal selon vos besoins
    data: symptom // Passer les données du symptôme sélectionné au modal
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The edit dialog was closed');
    // Traiter les données retournées par le modal si nécessaire
  });
}
public searchSymptoms(criteria: string): void {
  console.log(criteria); // Affiche le critère de recherche dans la console
  if (criteria.trim() !== '') { // Vérifie si le critère de recherche n'est pas vide
    this.symptomService.searchSymptoms(criteria).subscribe(symptoms => {
      this.symptoms = symptoms; // Met à jour la liste des symptômes avec les résultats de la recherche
    });
  } else {
    this.getAllSymptoms(); // Si le critère de recherche est vide, affiche tous les symptômes
  }
}

viewSymptomDetails(symptomId: number): void {
  this.router.navigate(['/admin/allergy/view/details/symptom', symptomId]);
}

generateRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
exportExcel() {
  const exportData: Partial<Record<string, any>>[] = this.dataSource.filteredData.map((symptom) => ({
    'Symptom Name': symptom.symptomName,
    'Symptom Description': symptom.symptomDesc,
    //'Allergies': symptom.allergies?.map(allergy => allergy.name).join(', ') || 'N/A', // Use 'N/A' if allergies is null or undefined
  }));

  TableExportUtil.exportToExcel(exportData, 'Symptoms');
}

}
