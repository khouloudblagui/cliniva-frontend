import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ICD10sRoutingModule } from './ICD10s-routing.module';
import { AllICD10sComponent } from './allICD10s/allICD10s.component';
import { DeleteDialogComponent } from './allICD10s/dialogs/delete/delete.component';
import { FormDialogComponent } from './allICD10s/dialogs/form-dialog/form-dialog.component';
import { AddICD10Component } from './add-ICD10/add-ICD10.component';
import { EditICD10Component } from './edit-ICD10/edit-ICD10.component';
import { ICD10uploadExcelComponent } from './ICD10-uploadExcel/ICD10-uploadExcel.component';
import { ICD10Service } from './allICD10s/ICD10.service';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';

@NgModule({
  declarations: [
    AllICD10sComponent,
    DeleteDialogComponent,
    FormDialogComponent,
    AddICD10Component,
    EditICD10Component,
    ICD10uploadExcelComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ICD10sRoutingModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [ICD10Service],
})
export class ICD10Module {}
