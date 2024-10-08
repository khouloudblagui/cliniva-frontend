import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppointmentService } from './appointment.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Appointment } from './appointment.model';
import { DataSource } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Direction } from '@angular/cdk/bidi';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-viewappointment',
  templateUrl: './viewappointment.component.html',
  styleUrls: ['./viewappointment.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})
export class ViewappointmentComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = ['select', 'img', 'name', 'email', 'gender', 'date', 'time', 'mobile', 'doctor', 'injury', 'actions'];
  exampleDatabase?: AppointmentService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<Appointment>(true, []);
  id?: number;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter?: ElementRef;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public appointmentService: AppointmentService,
    private snackBar: MatSnackBar
  ) {
    super();
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.exampleDatabase = this.appointmentService;
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    fromEvent(this.filter?.nativeElement, 'keyup').subscribe(() => {
      if (this.dataSource) {
        this.dataSource.filter = this.filter?.nativeElement.value.trim().toLowerCase();
      }
    });
  }

  refresh() {
    if (this.dataSource) {
      this.dataSource.refreshData();
      this.showNotification('snackbar-info', 'Data refreshed successfully!', 'bottom', 'center');
    }
  }

  addNew() {
    const tempDirection: Direction = localStorage.getItem('isRtl') === 'true' ? 'rtl' : 'ltr';

    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: { appointment: {}, action: 'add' },
      direction: tempDirection,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.exampleDatabase?.dataChange.value.unshift(this.appointmentService.getDialogData());
        this.refreshTable();
        this.showNotification('snackbar-success', 'Appointment added successfully!', 'bottom', 'center');
      }
    });
  }

  editCall(row: Appointment) {
    this.id = row.id;
    const tempDirection: Direction = localStorage.getItem('isRtl') === 'true' ? 'rtl' : 'ltr';

    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: { appointment: row, action: 'edit' },
      direction: tempDirection,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase?.dataChange.value.findIndex((x) => x.id === this.id);
        if (foundIndex !== undefined && foundIndex > -1) {
          this.exampleDatabase!.dataChange.value[foundIndex] = this.appointmentService.getDialogData();
          this.refreshTable();
          this.showNotification('snackbar-success', 'Appointment updated successfully!', 'bottom', 'center');
        }
      }
    });
  }

  deleteItem(row: Appointment) {
    this.id = row.id;
    const tempDirection: Direction = localStorage.getItem('isRtl') === 'true' ? 'rtl' : 'ltr';

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: row,
      direction: tempDirection,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase?.dataChange.value.findIndex((x) => x.id === this.id);
        if (foundIndex !== undefined && foundIndex > -1) {
          this.exampleDatabase!.dataChange.value.splice(foundIndex, 1);
          this.refreshTable();
          this.showNotification('snackbar-danger', 'Appointment deleted successfully!', 'bottom', 'center');
        }
      }
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource?.renderedData.length || 0;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.renderedData.forEach((row) => this.selection.select(row));
  }

  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;
    this.selection.selected.forEach((item) => {
      const index = this.dataSource.renderedData.findIndex((d) => d === item);
      if (index > -1) {
        this.exampleDatabase!.dataChange.value.splice(index, 1);
        this.refreshTable();
      }
    });
    this.selection.clear();
    this.showNotification('snackbar-danger', `${totalSelect} Record(s) deleted successfully!`, 'bottom', 'center');
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  showNotification(colorName: string, text: string, placementFrom: any, placementAlign: any) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}

export class ExampleDataSource extends DataSource<Appointment> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Appointment[] = [];
  renderedData: Appointment[] = [];

  constructor(public exampleDatabase: AppointmentService, public paginator: MatPaginator, public _sort: MatSort) {
    super();
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  connect(): Observable<Appointment[]> {
    if (!this.exampleDatabase) {
      throw new Error('exampleDatabase is not defined');
    }

    const displayDataChanges = [this.exampleDatabase.dataChange, this._sort.sortChange, this.filterChange, this.paginator.page];

    this.exampleDatabase.getAllAppointments();

    return merge(...displayDataChanges).pipe(
      map(() => {
        if (!this.exampleDatabase.data) {
          return [];
        }

        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((appointment: Appointment) => {
            const searchStr = (
              appointment.name +
              appointment.email +
              appointment.gender +
              appointment.date +
              appointment.doctor +
              appointment.injury +
              appointment.mobile
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });

        const sortedData = this.sortData(this.filteredData.slice());
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this.paginator.pageSize);
        return this.renderedData;
      })
    );
  }

  disconnect() {}

  refreshData() {
    this.exampleDatabase.getAllAppointments();
  }

  sortData(data: Appointment[]): Appointment[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id':
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case 'name':
          [propertyA, propertyB] = [a.name, b.name];
          break;
        case 'email':
          [propertyA, propertyB] = [a.email, b.email];
          break;
        case 'time':
          [propertyA, propertyB] = [a.time, b.time];
          break;
        case 'mobile':
          [propertyA, propertyB] = [a.mobile, b.mobile];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
