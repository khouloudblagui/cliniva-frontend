import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddSurgicalProcedureComponent } from "./add-surgical procedure/add-surgicalprocedure.component";
import { AllSurgicalProceduresComponent } from "./allsurgicalprocedure/allsurgicalprocedure.component";
import {  EditSurgicalProcedureComponent } from "./edit-surgical procedure/edit-surgical procedure.component";
import { surgicalprocedureuploadComponent } from "./upload-surgical procedure/surgicalprocedure-upload.component";

import { Page404Component } from "../../authentication/page404/page404.component";
const routes: Routes = [
  {
    path: "allsurgical procedure",
    component: AllSurgicalProceduresComponent,
  },
  {
    path: "add-surgical procedure",
    component: AddSurgicalProcedureComponent,
  },
  {
    path: "edit-surgical procedure",
    component: EditSurgicalProcedureComponent,
  },
  {
    path: "upload-surgical procedure",
    component: surgicalprocedureuploadComponent,
  },
  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurgicalprocedureRoutingModule {}
