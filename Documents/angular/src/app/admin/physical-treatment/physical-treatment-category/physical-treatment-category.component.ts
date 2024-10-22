import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PhysicalTreatmentCategory } from '../model/physical-treatment.category';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PhyTrCategoryService } from '../services/physical-treatment-category.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryComponent } from './dialogs/add-category/add-category.component';
import { TableExportUtil } from '@shared';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DeleteCategoryComponent } from './dialogs/delete-category/delete-category.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-physical-treatment-category',
  templateUrl: './physical-treatment-category.component.html',
  styleUrls: ['./physical-treatment-category.component.scss']
})
export class PhysicalTreatmentCategoryComponent implements OnInit {
  categories: PhysicalTreatmentCategory[] = []; // Modifiez le nom de la variable et son type
  dataSource!: MatTableDataSource<PhysicalTreatmentCategory>; // Modifiez le type de MatTableDataSource
  selection = new SelectionModel<PhysicalTreatmentCategory>(true, []); // Modifiez le type de SelectionModel
  displayedColumns: string[] = ['categoryid', 'phyCategoryName', 'phyCategoryDesc', 'actions']; // Modifiez les noms des colonnes
  exampleDatabase?:PhyTrCategoryService;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter?: ElementRef;

  constructor(private phyTrCategoryService: PhyTrCategoryService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,) { } // Modifiez le nom du service

  ngOnInit(): void {
    this.getPhysicalTreatmentCategories(); // Modifiez le nom de la méthode
    this.dataSource = new MatTableDataSource<PhysicalTreatmentCategory>([]); // Modifiez le type de MatTableDataSource
    this.loadData();
  }
  refresh() {
    this.loadData();
  }
  loadData(): void {
    this.phyTrCategoryService.getAllPhyTrCategories().subscribe((data: PhysicalTreatmentCategory[]) => {
      this.dataSource = new MatTableDataSource(data); // Initialise dataSource avec les données
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
}
public searchPhysicalTreatmentsCategory(key: string): void {
  console.log(key); // Affiche la clé de recherche dans la console
  if (key.trim() !== '') { // Vérifie si la clé de recherche n'est pas vide
    this.dataSource.filter = key.trim().toLowerCase(); // Appliquez le filtre directement sur la source de données
  } else {
    this.loadData(); // Si la clé de recherche est vide, rechargez les données
  }
}
exportExcel() {
  const exportData: Partial<Record<string, any>>[] = this.dataSource.filteredData.map((category) => ({
    'Category ID': category.categoryid,
    'Category Name': category.phyCategoryName,
    'Category Description': category.phyCategoryDesc,
    // Vous pouvez ajouter d'autres propriétés de catégorie selon vos besoins
  }));

  TableExportUtil.exportToExcel(exportData, 'Physical Treatment Categories');
}


  getPhysicalTreatmentCategories(): void { // Modifiez le nom de la méthode
    console.log('Fetching physical treatment categories...'); // Modifiez le message de journalisation
    this.phyTrCategoryService.getAllPhyTrCategories().subscribe({ // Utilisez le service pour récupérer les catégories
      next: (data) => {
        console.log('Fetch successful!'); // Modifiez le message de journalisation
        this.categories = data; // Affectez les données récupérées à la variable categories
        this.dataSource.data = data; // Mettez à jour les données du MatTableDataSource
        this.dataSource.paginator = this.paginator; // Initialisez le paginator
        this.dataSource.sort = this.sort; // Initialisez le sort
      },
      error: (error) => {
        console.error('An error occurred while fetching physical treatment categories:', error); // Modifiez le message de journalisation
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
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '600px', // Définir la largeur de la modal selon vos besoins
      height: '430px',
      // Autres configurations de la modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Traiter les données retournées par la modal si nécessaire
      this.refresh();
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
  openDeleteTreatmentModal(category: PhysicalTreatmentCategory): void {
    const dialogRef = this.dialog.open(DeleteCategoryComponent, {
      width: '400px',
      data: category // Passer la catégorie sélectionnée au dialogue de suppression
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Delete modal closed with result:', result);
      if (result === true) {
        // Supprimer la catégorie de traitement de la base de données
        this.phyTrCategoryService.deletePhyTrCategory(category.categoryid).subscribe(() => {
          console.log('Category successfully removed from the database');
          // Supprimer la catégorie de traitement du tableau du modèle
          this.categories = this.categories.filter(cat => cat !== category);
          this.dataSource.data = this.categories; // Mise à jour de la source de données de la table
          this.showNotification(
            'snackbar-success',
            'Category Deleted Successfully...!!!',
            'bottom',
            'center'
          );
          this.refresh();
        }, (error) => {
          console.error('Error removing category from the database:', error);
          this.showNotification('error', 'Failed to delete category', 'bottom', 'right');
          // Afficher un message d'erreur ou gérer l'erreur autrement
        });
      }
    });
  }
  viewPhysicalTreatmentCategoryDetails(category: PhysicalTreatmentCategory): void {
    // Navigate to the details page with the ID of the selected physical treatment category
    this.router.navigate(['/admin/physical-treatment/view/details/physical-treatment-category', category.categoryid]);
  }
  
  
}
