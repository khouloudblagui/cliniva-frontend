import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Page404Component } from "./../../authentication/page404/page404.component";
import { AllergylistComponent } from "./allergylist/allergylist.component";
import { SymptomslistComponent } from "./symptomslist/symptomslist.component";
import { ViewDetailsAllergyComponent } from "./view-details-allergy/view-details-allergy.component";
import { ViewDetailsSymptomComponent } from "./view-details-symptom/view-details-symptom.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'allergylist', // Modifier le chemin pour allergylist
        component: AllergylistComponent,
      },
      {
        path: 'symptomslist', // Modifier le chemin pour allergylist
        component: SymptomslistComponent,
      },
      {
        path: 'view/details/allergy/:id',
        component: ViewDetailsAllergyComponent,
      },
      {
        path: 'view/details/symptom/:id',
        component: ViewDetailsSymptomComponent,
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

