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
    path: 'physical-treatment', // Chemin pour le module Physical Treatment
    loadChildren: () =>
      import('./physical-treatment/physical-treatment.module').then((m) => m.PhysicalTreatmentModule),
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
    path: 'room',
    loadChildren: () => import('./room/room.module').then((m) => m.RoomModule),
  },




  {
    path: 'Surgical procedure',
    loadChildren: () =>
      import('./Surgical procedure/surgicalprocedure.module').then((m) => m.SurgicalprocedureModule),
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
