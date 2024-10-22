import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BioanalysisListComponent } from './bioanalysis-list/bioanalysis-list.component';
import { Page404Component } from 'app/authentication/page404/page404.component';
import { BioanalysisDetailsComponent } from './bioanalysis-details/bioanalysis-details.component';

const routes: Routes = [
  {
    path: 'bioanalysis-list',
    component: BioanalysisListComponent,
  },

  {
    path: 'bioanalysis-details/:id',
    component: BioanalysisDetailsComponent,
  },

  { path: '**', component: Page404Component },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BioanalysisRoutingModule { }
