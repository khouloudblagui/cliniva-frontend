import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MedicationRoutingModule } from './medication-routing.module';
import { AllMedicationComponent } from './allstaff/allmedication.component';
import { FormDialogComponent } from './allstaff/dialog/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './allstaff/dialog/delete/delete.component';
import { AddMedicationComponent } from './add-medication/add-medication.component';
import { EditMedicationComponent } from './edit-medication/edit-medication.component';
import { MedicationService } from './allstaff/medication.service';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { UploadFileComponent } from './upload-file/upload-file.component';

@NgModule({
  declarations: [
    AllMedicationComponent,
    FormDialogComponent,
    DeleteDialogComponent,
    AddMedicationComponent,
    EditMedicationComponent,
    UploadFileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MedicationRoutingModule,
    ComponentsModule,
    SharedModule
  ],
  providers: [MedicationService],
})
export class MedicationModule {}
