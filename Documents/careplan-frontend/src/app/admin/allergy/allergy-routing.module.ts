import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Page404Component } from "./../../authentication/page404/page404.component";
import { AllergylistComponent } from "./allergylist/allergylist.component";
import { ViewDetailsAllergyComponent } from "./view-details-allergy/view-details-allergy.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'allergylist', // Modifier le chemin pour allergylist
        component: AllergylistComponent,
      },
      {
        path: 'view/details/allergy/:id',
        component: ViewDetailsAllergyComponent,
      },
      
      { path: "**", component: Page404Component },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllergyRoutingModule {}

