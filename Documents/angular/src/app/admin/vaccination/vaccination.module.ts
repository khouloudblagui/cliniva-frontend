import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VaccinationRoutingModule } from './vaccination-routing.module';
import { VaccinationListComponent } from './vaccination-list/vaccination-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { AddVaccinationComponent } from './vaccination-list/dialog/add-vaccination/add-vaccination.component';
import { DeleteVaccinationComponent } from './vaccination-list/dialog/delete-vaccination/delete-vaccination.component';
import { VaccinationDetailsComponent } from './vaccination-details/vaccination-details.component';
import { UpdateVaccinationComponent } from './vaccination-details/dialog/update-vaccination/update-vaccination.component';
import { AdverseEffectListComponent } from './adverse-effect-list/adverse-effect-list.component';
import { DeleteAdverseEffectComponent } from './adverse-effect-list/dialog/delete-adverse-effect/delete-adverse-effect.component';
import { AddAdverseEffectComponent } from './adverse-effect-list/dialog/add-adverse-effect/add-adverse-effect.component';
import { AdverseEffectDetailsComponent } from './adverse-effect-details/adverse-effect-details.component';
import { UpdateAdverseEffectComponent } from './adverse-effect-details/dialog/update-adverse-effect/update-adverse-effect.component';

@NgModule({
  declarations: [
    VaccinationListComponent,
    AddVaccinationComponent,
    DeleteVaccinationComponent,
    VaccinationDetailsComponent,
    UpdateVaccinationComponent,
    AdverseEffectListComponent,
    DeleteAdverseEffectComponent,
    AddAdverseEffectComponent,
    AdverseEffectDetailsComponent,
    UpdateAdverseEffectComponent
  ],
  imports: [
    CommonModule,
    VaccinationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
  ]
})
export class VaccinationModule { }
