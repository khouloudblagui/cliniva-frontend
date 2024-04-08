import { Direction } from '@angular/cdk/bidi';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ICD10 } from './ICD10.model';
import { DataSource } from '@angular/cdk/collections';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BehaviorSubject, forkJoin, fromEvent, merge, Observable,of,throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.component';
import { SelectionModel } from '@angular/cdk/collections';
import { catchError } from 'rxjs/operators';
import {
  TableExportUtil,
  TableElement,
  UnsubscribeOnDestroyAdapter,
} from '@shared';
import { ICD10Service } from './ICD10.service';
@Component({
  selector: 'app-allICD10s',
  templateUrl: './allICD10s.component.html',
  styleUrls: ['./allICD10s.component.scss'],
  //providers: [ICD10Service], 
})
export class AllICD10sComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  displayedColumns = [
    'select',
    'code',
    'chapter',
    'block',
    'category', 
    'subcategory',
    'extension',
    'notes',
    'description',
    'actions',
  ];
  dataS:ICD10[]=[];
  dataSource!: Observable<ICD10[]>;
  //dataSource!: ExampleDataSource;
  //dataSource:ICD10[] =[];
  exampleDatabase?: ICD10Service;
  selection = new SelectionModel<ICD10>(true, []);
  index?: number;
  ICD10code?: string;
  ICD10?: ICD10;
  loading: boolean= true;
  
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public icd10service: ICD10Service,
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
      this.icd10service.getAllICD10().subscribe(
        (data: ICD10[]) => {
           this.dataS = data ;
           console.log('Données récupérées depuis le service ICD10sService :', this.dataS); 
            // Assigner les données à la propriété dataSource
            this.dataSource = new BehaviorSubject<ICD10[]>(data); // Convertir le tableau en Observable
            // Désactiver l'indicateur de chargement une fois les données récupérées
            this.loading = false;
        },)
    }
  
  refresh() {
    this.loadData();
  }

  dataajout: ICD10 = {
    icd10ky: 1, // Valeur numérique pour icd10ky
    icd10Code: 'ABC123', // Valeur de chaîne pour icd10Code
    icd10Chapter: 'Chapter', // Valeur de chaîne pour icd10Chapter
    icd10Block: 'Block', // Valeur de chaîne pour icd10Block
    icd10Category: 'Category', // Valeur de chaîne pour icd10Category
    icd10Subcategory: 'Subcategory', // Valeur de chaîne pour icd10Subcategory
    icd10Extension: 'Extension', // Valeur de chaîne pour icd10Extension
    icd10Notes: 'Notes', // Valeur de chaîne pour icd10Notes
    icd10Description: 'Description' // Valeur de chaîne pour icd10Description
  };
  
  icd10List: ICD10[] = [];
/*
  getAllICD10(): void {
    this.ICD10sService.getAllICD10().subscribe(
      (data: ICD10[]) => {
        console.log('Données récupérées depuis le service ICD10sService :', data); // Ajout du log
        this.dataSource = data;
      },
      (error: any) => {
        this.snackBar.open('Erreur lors du chargement des icd10', 'OK', {
          duration: 2000,
        });
      }
    );
  }*/
  



  getAllICD10(): void {
    // Afficher l'indicateur de chargement
    this.loading = true;

    this.icd10service.getAllICD10().subscribe(
        (data: ICD10[]) => {
            console.log('Données récupérées depuis le service ICD10sService :', data); // Ajout du log
            // Assigner les données à la propriété dataSource
            this.dataSource = new BehaviorSubject<ICD10[]>(data); // Convertir le tableau en Observable
            // Désactiver l'indicateur de chargement une fois les données récupérées
            this.loading = false;
        },
        (error: any) => {
            console.error('Erreur lors du chargement des codes ICD10 :', error); // Journaliser l'erreur dans la console
            this.snackBar.open('Une erreur est survenue lors du chargement des codes ICD10. Veuillez réessayer.', 'OK', {
                duration: 5000, // Afficher le message d'erreur pendant 5 secondes
            });
            // Désactiver l'indicateur de chargement en cas d'erreur
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

  




 /* getAllICD10(): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8088/icd10/all')
      .pipe(
        catchError(error => {
          return throwError(this.handleError(error));
        })
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
/*

  getAllICD10(): void {
    this.ICD10sService.getAllICD10()
      .subscribe(data => {
        this.icd10List = data;
      });
  }
*/




  addNew() {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        ICD10: this.dataajout,
        action: 'add',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataServicex
        this.exampleDatabase?.dataChange.value.unshift(
          this.dataajout=this.icd10service.getDialogData()
         // this.icd10service.addICD10s()
        );
        this.refreshTable();
        this.getAllICD10();
        this.showNotification(
          'snackbar-success',
          'Add Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }
  editCall(row: ICD10) {
    this.ICD10code = row.icd10Code;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        ICD10: row,
        action: 'edit',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
          (x: { icd10code: string ; }) => x.icd10code === this.ICD10code
          );
        // Then you update that record using data from dialogData (values you enetered)
        if (foundIndex != null && this.exampleDatabase) {
          console.log('Données récupérées depuis le service ICD10sService pour modifier  :', row);
          this.exampleDatabase.dataChange.value[foundIndex] =
            this.icd10service.getDialogData();
          // And lastly refresh table
          this.refreshTable();
          this.showNotification(
            'black',
            'Edit Record Successfully...!!!',
            'bottom',
            'center'
          );
        }
      }
    });
  }


  deleteItem(row: ICD10) {
    this.ICD10code = row.icd10Code;
    console.log('row à supprimer :', row);
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data:row,
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
          (x: { icd10code: string ; }) => x.icd10code === this.ICD10code
        );
        // for delete we use splice in order to remove single object from DataService
        if (foundIndex != null && this.exampleDatabase) {
          console.log('Données récupérées depuis le service ICD10sService :', row);
          this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
          this.icd10service.removeICD10(row.icd10Code).subscribe(
            () => {
              console.log('Suppression réussie.');
              // Rafraîchir la table après la suppression
            
            },
            (error) => {
              console.error('Erreur lors de la suppression :', error);
            }
          );
        

          this.refreshTable();
          this.showNotification(
            'snackbar-danger',
            'Delete Record Successfully...!!!',
            'bottom',
            'center'
          );
        }
      }
    });
  }
  private refreshTable() {
    this.paginator?._changePageSize(this.paginator?.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    let numSelected = 0;
    let numRows = 0;
    this.dataSource.subscribe(data => {
      numRows = data.length;
      numSelected = this.selection.selected.length;
  });
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
      this.icd10service.removeICD10(item.icd10Code).subscribe(
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
    this.getAllICD10();
    // Afficher une notification pour indiquer que les enregistrements ont été supprimés
    this.showNotification(
      'snackbar-danger',
      totalSelect + ' Record(s) Deleted Successfully...!!!',
      'bottom',
      'center'
    );
  }
  
  
  
  
  public loadData() {
    this.exampleDatabase = new ICD10Service(this.httpClient);
    this.dataSource = new ExampleDataSource(
        this.exampleDatabase,
        this.paginator,
        this.sort
    ).connect();
}
search(filterValue: string): void {
  if (filterValue.trim()) {
    const filteredData = this.dataS.filter(icd10 =>
      icd10.icd10Code.toLowerCase().includes(filterValue.toLowerCase()) ||
      icd10.icd10Description.toLowerCase().includes(filterValue.toLowerCase()) ||
      icd10.icd10Notes.toLowerCase().includes(filterValue.toLowerCase())
    );
    this.dataSource = of(filteredData); // Émettre les données filtrées dans l'observable
    console.log('Données filtrés  :', this.dataSource); 
  } else {
    this.dataSource = of(this.dataS); // Émettre les données non filtrées dans l'observable
    console.log('Données filtrés  :', this.dataS); 
  }
}


 /*public loadData() {
    this.exampleDatabase = new ICD10Service(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    this.subs.sink = fromEvent(this.filter?.nativeElement, 'keyup').subscribe(
      () => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter?.nativeElement.value;
      }
    );
  }*/
  // export table data in excel file
 /* exportExcel() {
    // key name with space add in brackets
    const exportData: Partial<TableElement>[] =
      this.dataSource.filteredData.map((x) => ({
        Code: x.ICD10Code,
        subcategory: x.ICD10Subcategory,
        description: x.ICD10Description,
        'Joining Date': formatDate(new Date(x.ICD10Extension), 'yyyy-MM-dd', 'en') || '',
        Chapter: x.ICD10Chapter,
        Block: x.ICD10Block,
        Category: x.ICD10Category,
      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }
*/
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
  this.getAllICD10();
}
}

export class ExampleDataSource extends DataSource<ICD10> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: ICD10[] = [];
  renderedData: ICD10[] = [];
  constructor(
    public exampleDatabase: ICD10Service,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ICD10[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllICD10();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((ICD10: ICD10) => {
            const searchStr = (
              ICD10.icd10Code +
              ICD10.icd10Description +
              ICD10.icd10Chapter +
              ICD10.icd10Block +
              ICD10.icd10Subcategory +
              ICD10.icd10Category
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
      })
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  disconnect() {}
  /** Returns a sorted copy of the database data. */
  sortData(data: ICD10[]): ICD10[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'ky':
          [propertyA, propertyB] = [a.icd10ky, b.icd10ky];
          break;
        case 'code':
          [propertyA, propertyB] = [a.icd10Code, b.icd10Code];
          break;
        case 'subcategory':
          [propertyA, propertyB] = [a.icd10Subcategory, b.icd10Subcategory];
          break;
        case 'extension':
          [propertyA, propertyB] = [a.icd10Extension, b.icd10Extension];
          break;
        case 'description':
          [propertyA, propertyB] = [a.icd10Description, b.icd10Description];
          break;
        case 'category':
          [propertyA, propertyB] = [a.icd10Category, b.icd10Category];
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