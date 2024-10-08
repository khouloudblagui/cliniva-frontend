import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PatientService } from './patient.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Patient } from './patient.model';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { FormDialogComponent } from './dialog/form-dialog/form-dialog.component';
import { DeleteComponent } from './dialog/delete/delete.component';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { Direction } from '@angular/cdk/bidi';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-allpatients',
  templateUrl: './allpatients.component.html',
  styleUrls: ['./allpatients.component.scss'],
})
export class AllpatientsComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
    'select',
    'img',
    'name',
    'gender',
    'address',
    'mobile',
    'date',
    'bGroup',
    'treatment',
    'actions',
  ];
  dataSource = new MatTableDataSource<Patient>();
  selection = new SelectionModel<Patient>(true, []);
  index?: number;
  id?: number;
  patient?: Patient;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public patientService: PatientService,
    private snackBar: MatSnackBar
  ) {
    super();
  }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter?: ElementRef;

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew() {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        patient: this.patient,
        action: 'add',
      },
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  editCall(row: Patient) {
    this.id = row.id;
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        patient: row,
        action: 'edit',
      },
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  deleteItem(row: Patient) {
    this.id = row.id;
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: row,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.patientService.deletePatient(this.id!);
        this.loadData();
      }
    });
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach((row) => this.selection.select(row));
    }
  }

  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;
    this.selection.selected.forEach((item) => {
      const index: number = this.dataSource.data.findIndex((d) => d === item);
      this.patientService.deletePatient(item.id); // Appel à la suppression du patient
      this.dataSource.data.splice(index, 1);
      this.selection = new SelectionModel<Patient>(true, []);
    });
    this.showNotification(
      `${totalSelect} Record(s) Deleted Successfully...!!!`,
      'bottom',
      'center'
    );
  }

  // Méthode pour afficher une notification avec MatSnackBar
  showNotification(
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 3000, // Durée d'affichage en millisecondes
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
    });
  }



  public isTblLoading = true;
  public loadData() {
    this.isTblLoading = true; // Commence le chargement des données
    this.patientService.getAllPatients();
    this.patientService.dataChange.subscribe((data) => {
      this.isTblLoading = false; // Les données sont chargées
      this.dataSource.data = data; // Assigner les données reçues
      this.dataSource.paginator = this.paginator; // Assigner le paginator
      this.dataSource.sort = this.sort; // Assigner le tri
    });
    // Assigner le filtre (search)
    if (this.filter && this.filter.nativeElement) {
      this.subs.sink = fromEvent(this.filter.nativeElement, 'keyup').subscribe(() => {
        const filterValue = this.filter!.nativeElement.value.trim().toLowerCase();
        this.dataSource.filter = filterValue;
      });
    }
  }
}
