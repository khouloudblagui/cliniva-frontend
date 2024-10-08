import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table'; // Import MatTableDataSource

import { DoctorsService } from './doctors.service';
import { Doctors } from './doctors.model';
import { DeleteDialogComponent } from './dialogs/delete/delete.component';
import { FormDialogComponent } from './dialogs/form-dialog/form-dialog.component';

@Component({
  selector: 'app-alldoctors',
  templateUrl: './alldoctors.component.html',
  styleUrls: ['./alldoctors.component.scss'],
})
export class AlldoctorsComponent implements OnInit {
  displayedColumns = ['select', 'name', 'department', 'specialization', 'degree', 'mobile', 'email', 'date', 'actions'];
  dataSource = new MatTableDataSource<Doctors>(); // Initialisation de dataSource
  selection = new SelectionModel<Doctors>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(public doctorsService: DoctorsService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.doctorsService.getAllDoctors();
    this.doctorsService.dataChange.subscribe((data) => {
      this.dataSource.data = data; // Correct way to assign data
      this.dataSource.paginator = this.paginator; // Assign paginator
      this.dataSource.sort = this.sort; // Assign sort
    });
  }

  addNew() {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        action: 'add',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  editCall(row: Doctors) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        doctors: row,
        action: 'edit',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  deleteItem(row: Doctors) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.doctorsService.deleteDoctors(row.id);
        this.loadData();
      }
    });
  }

  /** Pagination and Filtering */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Correct way to apply a filter

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage(); // Reset to first page after filter is applied
    }
  }

  /** Selection Methods */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  removeSelectedRows() {
    const idsToRemove = this.selection.selected.map(item => item.id);
    idsToRemove.forEach(id => {
      this.doctorsService.deleteDoctors(id);
    });
    this.loadData();
  }
  refresh() {
    this.loadData();
  }

}
