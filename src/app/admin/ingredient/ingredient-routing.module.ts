import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AllIngredientComponent } from "./allingredient/allingredient.component";
import { AddIngredientComponent } from "./add-ingredient/add-ingredient.component";
import { EditIngredientComponent } from "./edit-ingredient/edit-ingredient.component";
import { Page404Component } from "../../authentication/page404/page404.component";
import { UploadFileIngredientComponent } from "./upload-file-ingredient/upload-file-ingredient.component";
const routes: Routes = [
  {
    path: "all-ingredient",
    component: AllIngredientComponent,
  },
  {
    path: "add-ingredient",
    component: AddIngredientComponent,
  },
  {
    path: "edit-ingredient",
    component: EditIngredientComponent,
  },
  {
    path: "upload-ingredient",
    component: UploadFileIngredientComponent,
  },
  
  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngredientRoutingModule {}
