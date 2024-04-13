import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'appointment',
    loadChildren: () =>
      import('./appointment/appointment.module').then(
        (m) => m.AppointmentModule
      ),
  },
  {
    path: 'doctors',
    loadChildren: () =>
      import('./doctors/doctors.module').then((m) => m.DoctorsModule),
  },

  {
    path: 'medication',
    loadChildren: () =>
      import('./medication/medication.module').then((m) => m.MedicationModule),
  },
  {
    path: 'ingredient',
    loadChildren: () =>
      import('./ingredient/ingredient.module').then((m) => m.IngredientModule),
  },
  {
    path: 'allergy', // Définir le chemin uniquement pour allergy
    loadChildren: () =>
      import('./allergy/allergy.module').then((m) => m.AllergyModule),
  },
  {
    path: 'vaccination',
        loadChildren: () =>
        import('./vaccination/vaccination.module').then((m) => m.VaccinationModule),
  },
  {
    path: 'bioanalysis',
    loadChildren: () =>
      import('./bioanalysis/bioanalysis.module').then((m) => m.BioanalysisModule),
  },
  {
    path: 'document-template',
    loadChildren: () =>
    import('./document-template/document-template.module').then((m) => m.DocumentTemplateModule),
  },
  {
    path: 'staff',
    loadChildren: () =>
      import('./staff/staff.module').then((m) => m.StaffModule),
  },
  {
    path: 'patients',
    loadChildren: () =>
      import('./patients/patients.module').then((m) => m.PatientsModule),
  },
  {
    path: 'billing',
    loadChildren: () =>
      import('./billing/billing.module').then((m) => m.BillingModule),
  },
  {
    path: 'room',
    loadChildren: () => import('./room/room.module').then((m) => m.RoomModule),
  },
  {
    path: 'departments',
    loadChildren: () =>
      import('./departments/departments.module').then(
        (m) => m.DepartmentsModule
      ),
  },
  {
    path: 'inventory',
    loadChildren: () =>
      import('./inventory/inventory.module').then((m) => m.InventoryModule),
  },
  {
    path: 'records',
    loadChildren: () =>
      import('./records/records.module').then((m) => m.RecordsModule),
  },
  {
    path: 'ambulance',
    loadChildren: () =>
      import('./ambulance/ambulance.module').then((m) => m.AmbulanceModule),
  },
  {
    path: 'pharmacy',
    loadChildren: () =>
      import('./pharmacy/pharmacy.module').then((m) => m.PharmacyModule),
  },
  {
    path: 'ICD10',
    loadChildren: () =>
      import('./ICD10/ICD10.module').then((m) => m.ICD10Module),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
