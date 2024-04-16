import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IngredientService } from './ingredient.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Ingredient } from './ingredient.model';
import { HttpErrorResponse } from '@angular/common/http';
import { DataSource } from '@angular/cdk/collections';
import { FormDialogComponent } from './dialog/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './dialog/delete/delete.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { Direction } from '@angular/cdk/bidi';
import {
  TableExportUtil,
  TableElement,
  UnsubscribeOnDestroyAdapter,
} from '@shared';

@Component({
  selector: 'app-allIngredient',
  templateUrl: './allIngredient.component.html',
  styleUrls: ['./allIngredient.component.scss'],
})
export class AllIngredientComponent {
  displayedColumns = [
    'ingredientName',
    'ingredientDesc',
    'actions',
  ];
  dataSource: Ingredient[] = []; 
  
  constructor(
    public httpClient: HttpClient,
    public ingredientService: IngredientService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}
  
  
  originalDataSource: Ingredient[] = [];

  ngOnInit(): void {
    this.ingredientService.getAllIngredients().subscribe(data => {
      this.originalDataSource = data;
      this.dataSource = data;
    });
  }
  


  getAllIngredients(): void {
  this.ingredientService.getAllIngredients().subscribe((data: Ingredient[]) => {
    this.dataSource = data; 
  }, (error: any) => {
    this.snackBar.open('Error loading ingredients', 'Ok', {
      duration: 2000,
    });
  });
}

deleteIngredient(ingredientKy: number): void {
  this.ingredientService.deleteIngredient(ingredientKy).subscribe({
    next: () => {
      console.log('Ingredient deleted successfully');
      this.dataSource = this.dataSource.filter(ingredient => ingredient.ingredientKy !== ingredientKy);
      alert('Ingredient deleted successfully');
    },
    error: (error: HttpErrorResponse) => {
      console.error('An error occurred while deleting the ingredient :', error);
    }
  });
}
 
openEditDialog(row: any): void {
  // Ouvrir la boîte de dialogue
  const dialogRef = this.dialog.open(FormDialogComponent, {
    width: '600px', 
    data: { ingredient: row, ingredientKy: row.ingredientKy } 
  });

  // Souscrire à l'événement après la fermeture de la boîte de dialogue
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog box is closed');
    if (result) {
      // Rechargez les données pour refléter les mises à jour dans le tableau
      this.getAllIngredients();
    }
  });
}
refresh() {
  this.getAllIngredients();
}

search(filterValue: string): void {
  if (filterValue.trim()) {
    this.dataSource = this.originalDataSource.filter(ingredient =>
      ingredient.ingredientName.toLowerCase().includes(filterValue.toLowerCase()) ||
      ingredient.ingredientDesc.toLowerCase().includes(filterValue.toLowerCase())
    );
  } else {
    this.dataSource = this.originalDataSource; // Reset to original data on empty search
  }
}

exportExcel(): void {
  const exportData = this.dataSource.map(ingredient => ({
    'Ingredient Name': ingredient.ingredientName,
    'Ingredient Description': ingredient.ingredientDesc
  }));
  
  TableExportUtil.exportToExcel(exportData, 'ingredient');
}



}




