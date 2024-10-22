import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { BioanalysisRoutingModule } from './bioanalysis-routing.module';
import { BioanalysisListComponent } from './bioanalysis-list/bioanalysis-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { AddbioanalysisComponent } from './bioanalysis-list/dialog/addbioanalysis/addbioanalysis.component';
import { DeletebioanalysisComponent } from './bioanalysis-list/dialog/deletebioanalysis/deletebioanalysis.component';
import { BioanalysisDetailsComponent } from './bioanalysis-details/bioanalysis-details.component';
import { UpdatebioanalysisComponent } from './bioanalysis-list/dialog/updatebioanalysis/updatebioanalysis.component';


@NgModule({
  declarations: [
    BioanalysisListComponent,
    AddbioanalysisComponent,
    DeletebioanalysisComponent,
    BioanalysisDetailsComponent,
    UpdatebioanalysisComponent
  ],
  imports: [
    CommonModule,
    BioanalysisRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
  ]
})
export class BioanalysisModule { }
