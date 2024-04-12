import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AllICD10sComponent } from "./allICD10s/allICD10s.component";
import { AddICD10Component } from "./add-ICD10/add-ICD10.component";
import { EditICD10Component } from "./edit-ICD10/edit-ICD10.component";
import { ICD10uploadExcelComponent } from "./ICD10-uploadExcel/ICD10-uploadExcel.component";
import { Page404Component } from "../../authentication/page404/page404.component";
const routes: Routes = [
  {
    path: "all-ICD10",
    component: AllICD10sComponent,
  },
  {
    path: "add-ICD10",
    component: AddICD10Component,
  },
  {
    path: "edit-ICD10",
    component: EditICD10Component,
  },
  {
    path: "ICD10-uploadExcel",
    component: ICD10uploadExcelComponent,
  },
  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ICD10sRoutingModule {}
