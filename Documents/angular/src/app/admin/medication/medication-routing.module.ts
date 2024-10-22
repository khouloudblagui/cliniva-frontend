import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AllMedicationComponent } from "./allstaff/allmedication.component";
import { AddMedicationComponent } from "./add-medication/add-medication.component";
import { EditMedicationComponent } from "./edit-medication/edit-medication.component";
import { Page404Component } from "../../authentication/page404/page404.component";
import { UploadFileComponent } from "./upload-file/upload-file.component";
const routes: Routes = [
  {
    path: "all-medication",
    component: AllMedicationComponent,
  },
  {
    path: "add-medication",
    component: AddMedicationComponent,
  },
  {
    path: "edit-medication",
    component: EditMedicationComponent,
  },
  {
    path: "upload-medication",
    component: UploadFileComponent,
  },
  
  { path: "**", component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicationRoutingModule {}
