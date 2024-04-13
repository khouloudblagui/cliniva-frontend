import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DocTemp } from '../model/DocTemp';
import { SelectionModel } from '@angular/cdk/collections';
import { DocTempService } from '../services/doc-temp.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';
import { DeleteDocumentComponent } from './dialog/delete-document/delete-document.component';
import { AddDocumentComponent } from './dialog/add-document/add-document.component';
import { UpdateDocumentComponent } from './dialog/update-document/update-document.component';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent {
openEditModal(_t125: any) {
throw new Error('Method not implemented.');
}

  displayedColumns: string[] = ['select', 'templateDoc_Ky', 'templateDoc_Title', 'templateDoc_Desc', 'templateDoc_Format','templateDoc_Type', 'actions'];
  dataSource!: MatTableDataSource<DocTemp>;
  selection = new SelectionModel<DocTemp>(true, []);
  exampleDatabase?:DocTempService

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter?: ElementRef;

public doctemp: DocTemp[] = [];

constructor(
  public httpClient: HttpClient,
  public dialog: MatDialog,
  public doctempService: DocTempService,
  private snackBar: MatSnackBar,
  private router: Router
) {}


ngOnInit() {
  this.loadData();
  this.getAllDocuments();
}
refresh() {
  this.loadData();
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
  this.doctempService.getAllDocTemp().subscribe((data: DocTemp[]) => {
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

public getAllDocuments(): void {
  this.doctempService.getAllDocTemp().subscribe(
    (response: DocTemp[]) => {
      this.doctemp = response;
      console.log(this.doctemp);
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

openAddModal(): void {
  const dialogRef = this.dialog.open(AddDocumentComponent, {
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

openDeleteModal(row: DocTemp): void {
  const dialogRef = this.dialog.open(DeleteDocumentComponent, {
    width: '400px',
    data: row // Pass the entire row object to the dialog
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('Delete modal closed with result:', result);
    if (result === true) {
      // Delete the document by passing the ID
      this.doctempService.removeDocTemp(row.templateDoc_Ky).subscribe(() => {
        console.log('Document successfully removed from the database');
        // Remove the document from the local list
        this.doctemp = this.doctemp.filter(a => a !== row);
        this.showNotification(
          'snackbar-danger',
          'Record Deleted Successfully...!!!',
          'bottom',
          'center'
        );
        this.refresh();
      }, (error) => {
        console.error('Error removing document from the database:', error);
        // Handle error or display error message
      });
    }
  });
}



openDownload(row: any): void {
  const documentId = row.templateDoc_Ky;

  this.doctempService.downloadDocument(documentId).subscribe(
    (data: any) => {
      const blob = new Blob([data], { type: 'application/octet-stream' });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      
      // Set filename with the title obtained from the server
      link.setAttribute('download', `${row.templateDocTitle.replaceAll(' ', '_')}.${row.templateDoc_Format.toLowerCase()}`);

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
    (error: any) => {
      console.error('Error downloading document:', error);
      // Handle error response
    }
  );
}







openUpdateModal(row: DocTemp): void {

  const dialogRef = this.dialog.open(UpdateDocumentComponent, {
    width: '600px', 
    data: { document: row } 
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The update dialog was closed');
    this.refresh();
  });
}


}
