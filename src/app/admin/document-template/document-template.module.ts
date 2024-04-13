import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentTemplateRoutingModule } from './document-template-routing.module';
import { DocumentListComponent } from './document-list/document-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared/shared.module';
import { DeleteDocumentComponent } from './document-list/dialog/delete-document/delete-document.component';
import { AddDocumentComponent } from './document-list/dialog/add-document/add-document.component';
import { UpdateDocumentComponent } from './document-list/dialog/update-document/update-document.component';


@NgModule({
  declarations: [
    DocumentListComponent,
    DeleteDocumentComponent,
    AddDocumentComponent,
    UpdateDocumentComponent
  ],
  imports: [
    CommonModule,
    DocumentTemplateRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
  ]
})
export class DocumentTemplateModule { }
