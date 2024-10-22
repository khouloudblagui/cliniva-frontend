import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AllergyRoutingModule } from './allergy-routing.module';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
import { AllergyService } from './services/allergy.service';
import { AllergylistComponent } from './allergylist/allergylist.component';
import { EditAllergyComponent } from './view-details-allergy/dialogs/edit-allergy/edit-allergy.component';
import { DeleteAllergyComponent } from './allergylist/dialog/delete-allergy/delete-allergy.component';
import { AddAllergyComponent } from './allergylist/dialog/add-allergy/add-allergy.component';
import { ViewDetailsAllergyComponent } from './view-details-allergy/view-details-allergy.component';

@NgModule({
  declarations: [
    AllergylistComponent,
    EditAllergyComponent,
    DeleteAllergyComponent,
    AddAllergyComponent,
    ViewDetailsAllergyComponent,
   
  ],
  providers: [AllergyService],
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    AllergyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
    NgScrollbarModule,
    MatCheckboxModule,
  ],
})
export class AllergyModule {}
