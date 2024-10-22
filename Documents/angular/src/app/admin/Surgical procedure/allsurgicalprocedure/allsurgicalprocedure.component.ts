import { Direction } from '@angular/cdk/bidi';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { BehaviorSubject, merge, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormDialogComponent } from './dialog/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './dialog/delete/delete.component';
import { SelectionModel } from '@angular/cdk/collections';
import {UnsubscribeOnDestroyAdapter} from '@shared';
import { surgicalProcedureService } from './surgicalProcedure.service';
import { surgicalprocedure } from './surgicalprocedure.model';
import { SurgicalprocedureModule } from '../surgicalprocedure.module';
import { AddSurgicalProcedureComponent } from '../add-surgical procedure/add-surgicalprocedure.component';
@Component({
  selector: 'app-all-surgical-procedures',
  templateUrl: './allsurgicalprocedure.component.html',
  styleUrls: ['./allsurgicalprocedure.component.scss'],
})
export class AllSurgicalProceduresComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  public surgicals: surgicalprocedure[] = [];
  displayedColumns = [
    'select',
    'cptDesc',
    'cptCategory',
    'cptky',
    'cptCode',
    'actions'

  ]
  dataS: surgicalprocedure[] = [];
  surgicalprocedure?:surgicalprocedure;
  exampleDatabase?: surgicalProcedureService;
  dataSource!: Observable<surgicalprocedure[]>;
  selection = new SelectionModel<surgicalprocedure>(true, []);
  index?: number;

  loading = true;
  cptky?:  number;
  surgicalprocedureDesc!: string ;
  cptCode!: string;



  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public surgicalprocedureservice: surgicalProcedureService,
    private snackBar: MatSnackBar
  ) {
    super();
  }

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  @ViewChild('filter', { static: true }) filter?: ElementRef;

  ngOnInit(): void {
    this.surgicalprocedureservice.getAllsurgicalprocedure().subscribe(
      (data: surgicalprocedure[]) => {
        this.dataS = data;
        console.log('Data retrieved from surgicalprocedureservice:', this.dataS);
        this.dataSource = new BehaviorSubject<surgicalprocedure[]>(data);
        this.loading = false;
      }
    );
  }

  refresh() {
    this.loadData();
  }

  dataajout: surgicalprocedure = {
    cptCode: '',
    cptDesc: '',
    cptCategory: '',
    cptky: 0
  };

  surgicalprocedureList: surgicalprocedure[] = [];



  getAllsurgicalprocedure(): void {

    this.loading = true;

    this.surgicalprocedureservice.getAllsurgicalprocedure().subscribe(
        (data: surgicalprocedure[]) => {
            console.log('Données récupérées depuis le service surgicalprocedureService :', data);

            this.dataSource = new BehaviorSubject<surgicalprocedure[]>(data);

            this.loading = false;
        },
        (error: any) => {
            console.error('Erreur lors du chargement des codes surgicalprocedure :', error);
            this.snackBar.open('Une erreur est survenue lors du chargement des codes surgicalprocedure. Veuillez réessayer.', 'OK', {
                duration: 5000,
            });

            this.loading = false;
        }
    );
}


  private handleError(error: HttpErrorResponse): string {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Une erreur s'est produite : ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Code d'erreur : ${error.status}, message : ${error.message}`;
    }
    return errorMessage;
  }
  openAddModal(): void {
    const dialogRef = this.dialog.open(AddSurgicalProcedureComponent, {
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

  /*addNew() {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        surgicalprocedure: this.dataajout,
        action: 'add',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {

        this.exampleDatabase?.datachange.value.unshift(
          this.dataajout=this.surgicalprocedureservice.dialogData

        );
        this.refreshTable();
        this.getAllsurgicalprocedure();
        this.showNotification(
          'snackbar-success',
          'Add Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }*/

  editCall(row: surgicalprocedure) {
    this.cptCode = row.cptCode;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        surgicalprocedure:row,
        action: 'edit',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {

        const foundIndex = this.exampleDatabase?.datachange.value.findIndex(
          (x: {
            cptCode: surgicalprocedure | undefined; surgicalProcedure: string ;
}): boolean => x.cptCode === this.surgicalprocedure
          );

        if (foundIndex != null && this.exampleDatabase) {
          console.log('Données récupérées depuis le service surgicalProcedureService pour modifier  :', row);
          this.exampleDatabase.datachange.value[foundIndex] =
            this.surgicalprocedureservice.getdialogData();
          // And lastly refresh table
          this.refreshTable();

          this.showNotification(
            'snackbar-success',
            ' surgical Delete Successfully...!!!',
            'bottom',
            'center'
          );
          this.refresh();
         (error: any) => {
          console.error('Error removing surgical from the database:', error);
          this.showNotification('error', 'Failed to delete surgical', 'bottom', 'right');
          // Afficher un message d'erreur ou gérer l'erreur autrement
        }
        }
      }
    });
  }

  openDeleteModal(surgical:surgicalprocedure ): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      data: surgical // Passer surgical sélectionnée au dialogue de suppression
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Delete modal closed with result:', result);
      if (result === true) {
        // Supprimer surgical de la base de données
        this.surgicalprocedureservice.deletesurgicalprocedure(surgical.cptky).subscribe(() => {
          console.log('CPT successfully removed from the database');
          // Supprimer surgical du tableau du modèle
          this.surgicals = this.surgicals.filter(a => a !== surgical);
          this.getAllsurgicalprocedure();
          this.showNotification(
            'snackbar-success',
            ' surgical Delete Successfully...!!!',
            'bottom',
            'center'
          );
          this.refresh();
        }, (error) => {
          console.error('Error removing surgical from the database:', error);
          this.showNotification('error', 'Failed to delete surgical', 'bottom', 'right');
          // Afficher un message d'erreur ou gérer l'erreur autrement
        });
      }
    });
  }


  private refreshTable() {
    this.paginator?._changePageSize(this.paginator?.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataS.length; // Utilisez dataS pour obtenir le nombre total de lignes

    return numSelected === numRows;
}

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.subscribe(data => {
        data.forEach(row => this.selection.select(row));
      });

  }
  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;
    this.selection.selected.forEach((item) => {
      console.log('Données récupérées à supprimer :', item);
      // Appeler la méthode pour supprimer l'élément de la base de données
      this.surgicalprocedureservice.deletesurgicalprocedure(item.cptky).subscribe(
        () => {
          console.log('Suppression réussie.');
          // Rafraîchir la table après la suppression
          this.loadData();
        },
        (error) => {
          console.error('Erreur lors de la suppression :', error);
        }
      );
    });
    // Effacer la sélection après la suppression
    this.selection.clear();
    this.getAllsurgicalprocedure();
    // Afficher une notification pour indiquer que les enregistrements ont été supprimés
    this.showNotification(
      'snackbar-danger',
      totalSelect + ' Record(s) Deleted Successfully...!!!',
      'bottom',
      'center'
    );
  }




  public loadData() {
    this.exampleDatabase = new surgicalProcedureService(this.httpClient);
    this.dataSource = new ExampleDataSource(
        this.exampleDatabase,
        this.paginator,
        this.sort
    ).connect();
}
search(filterValue: string): void {
  if (filterValue.trim()) {
    const filteredData = this.dataS.filter(surgicalprocedure =>
      surgicalprocedure.cptDesc.toLowerCase().includes(filterValue.toLowerCase()) ||
      surgicalprocedure.cptCode.toLowerCase().includes(filterValue.toLowerCase())
    );
    this.dataSource = of(filteredData); // Émettre les données filtrées dans l'observable
    console.log('Données filtrés  :', this.dataSource);
  } else {
    this.dataSource = of(this.dataS); // Émettre les données non filtrées dans l'observable
    console.log('Données filtrés  :', this.dataS);
  }
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
  removeRowsAndRefresh() {
  this.removeSelectedRows();
  this.getAllsurgicalprocedure();
}
}

export class ExampleDataSource extends DataSource<surgicalprocedure> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  override disconnect(_collectionViewer: CollectionViewer): void {
    throw new Error('Method not implemented.');
  }
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: surgicalprocedure[] = [];
  renderedData: surgicalprocedure[] = [];
  constructor(
    public exampleDatabase: surgicalProcedureService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<surgicalprocedure[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.datachange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllsurgicalprocedure();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((surgicalprocedure: surgicalprocedure) => {
            const searchStr = (
              surgicalprocedure.cptky+
              surgicalprocedure.cptDesc+
              surgicalprocedure.cptCategory+
              surgicalprocedure.cptCode
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this.paginator.pageSize
        );
        return this.renderedData;
      }
      )
    );
  }


  sortData(data: surgicalprocedure[]): surgicalprocedure[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'ky':
          [propertyA, propertyB] = [a.cptky, b.cptky];
          break;
        case 'Name':
          [propertyA, propertyB] = [a.cptCode, b.cptCode];
          break;
        case 'description':
          [propertyA, propertyB] = [a.cptDesc, b.cptDesc];
          break;
          case 'category':
          [propertyA, propertyB] = [a.cptCategory, b.cptCategory];
          break;

      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }

}
