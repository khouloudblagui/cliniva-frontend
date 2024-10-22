import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SurgicalprocedureRoutingModule } from './surgicalprocedure-routing.module';
import { AllSurgicalProceduresComponent } from './allsurgicalprocedure/allsurgicalprocedure.component';
import { FormDialogComponent } from './allsurgicalprocedure/dialog/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './allsurgicalprocedure/dialog/delete/delete.component';
import { AddSurgicalProcedureComponent } from './add-surgical procedure/add-surgicalprocedure.component';
import { EditSurgicalProcedureComponent } from './edit-surgical procedure/edit-surgical procedure.component';
import { surgicalprocedureuploadComponent } from './upload-surgical procedure/surgicalprocedure-upload.component';
import { surgicalProcedureService } from './allsurgicalprocedure/surgicalProcedure.service';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';

@NgModule({
  declarations: [
    AllSurgicalProceduresComponent,
    FormDialogComponent,
    DeleteDialogComponent,
    AddSurgicalProcedureComponent,
    EditSurgicalProcedureComponent,
    surgicalprocedureuploadComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SurgicalprocedureRoutingModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [surgicalProcedureService],
})
export class SurgicalprocedureModule {}
