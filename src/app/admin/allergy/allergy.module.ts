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
import { SymptomslistComponent } from './symptomslist/symptomslist.component';
import { DeleteSymtomComponent } from './symptomslist/dialogs/delete-symtom/delete-symtom.component';
import { AddSymtomComponent } from './symptomslist/dialogs/add-symtom/add-symtom.component';
import { EditSymtomComponent } from './symptomslist/dialogs/edit-symtom/edit-symtom.component';
import { ViewDetailsAllergyComponent } from './view-details-allergy/view-details-allergy.component';
import { ViewDetailsSymptomComponent } from './view-details-symptom/view-details-symptom.component';
import { EditSymptomComponent } from './view-details-symptom/dialogs/edit-symptom/edit-symptom.component';

@NgModule({
  declarations: [
    AllergylistComponent,
    EditAllergyComponent,
    DeleteAllergyComponent,
    AddAllergyComponent,
    SymptomslistComponent,
    DeleteSymtomComponent,
    AddSymtomComponent,
    EditSymtomComponent,
    ViewDetailsAllergyComponent,
    ViewDetailsSymptomComponent,
    EditSymptomComponent,
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
