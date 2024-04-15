import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhysicalTreatmentListComponent } from './physical-treatment-list/physical-treatment-list.component';
import { PhysicalTreatmentCategoryComponent } from './physical-treatment-category/physical-treatment-category.component';
import { PhysicalTreatmentRoutingModule } from './physical-treatment-routing';
import { ViewDetailsCategoryComponent } from './view-details-category/view-details-category.component';
import { ViewDetailsPhyTreatmentComponent } from './view-details-phy-treatment/view-details-phy-treatment.component';
import { AddComponent } from './physical-treatment-list/dialogs/add/add.component';
import { DeleteComponent } from './physical-treatment-list/dialogs/delete/delete.component';
import { AddCategoryComponent } from './physical-treatment-category/dialogs/add-category/add-category.component';
import { EditCategoryComponent } from './view-details-category/dialogs/edit-category/edit-category.component';
import { DeleteCategoryComponent } from './physical-treatment-category/dialogs/delete-category/delete-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon'; 
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { EditPhytreatmentComponent } from './view-details-phy-treatment/dialogs/edit-phytreatment/edit-phytreatment.component';

@NgModule({
  declarations: [
    PhysicalTreatmentListComponent,
    PhysicalTreatmentCategoryComponent,
    ViewDetailsCategoryComponent,
    ViewDetailsPhyTreatmentComponent,
    AddComponent,
    DeleteComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    DeleteCategoryComponent,
    EditPhytreatmentComponent
  ],
  imports: [
    CommonModule,
    PhysicalTreatmentRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
    NgScrollbarModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule, 
  ]
})
export class PhysicalTreatmentModule { }
