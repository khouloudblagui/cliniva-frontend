import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IngredientRoutingModule } from './ingredient-routing.module';
import { AllIngredientComponent } from './allingredient/allingredient.component';
import { FormDialogComponent } from './allingredient/dialog/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './allingredient/dialog/delete/delete.component';
import { AddIngredientComponent } from './add-ingredient/add-ingredient.component';
import { EditIngredientComponent } from './edit-ingredient/edit-ingredient.component';
import { IngredientService } from './allingredient/ingredient.service';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { UploadFileIngredientComponent } from './upload-file-ingredient/upload-file-ingredient.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AllIngredientComponent,
    FormDialogComponent,
    DeleteDialogComponent,
    AddIngredientComponent,
    EditIngredientComponent,
    UploadFileIngredientComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IngredientRoutingModule,
    ComponentsModule,
    SharedModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [IngredientService],
})
export class IngredientModule {}
