import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentListComponent } from './document-list/document-list.component';

const routes: Routes = [
  {
    path: 'document-list',
    component: DocumentListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentTemplateRoutingModule { }
