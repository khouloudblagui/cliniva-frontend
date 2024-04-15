import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Page404Component } from "./../../authentication/page404/page404.component";
import { PhysicalTreatmentListComponent } from "./physical-treatment-list/physical-treatment-list.component";
import { PhysicalTreatmentCategoryComponent } from "./physical-treatment-category/physical-treatment-category.component";
import { ViewDetailsPhyTreatmentComponent } from "./view-details-phy-treatment/view-details-phy-treatment.component";
import { ViewDetailsCategoryComponent } from "./view-details-category/view-details-category.component";


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list', 
        component: PhysicalTreatmentListComponent,
      },
      {
        path: 'category', 
        component: PhysicalTreatmentCategoryComponent,
      },
      {
        path: 'view/details/physical-treatment/:id', 
        component: ViewDetailsPhyTreatmentComponent,
      },
      {
        path: 'view/details/physical-treatment-category/:id', 
        component: ViewDetailsCategoryComponent,
      },
      
      { path: "**", component: Page404Component },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhysicalTreatmentRoutingModule {}

