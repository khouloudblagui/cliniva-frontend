import { Component, OnInit } from '@angular/core';
import { DoctorService } from './doctor.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss'],
})
export class DoctorsComponent implements OnInit {
  doctors: any[] = []; // Tableau pour stocker les données des docteurs

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.fetchDoctors();
  }

  // Récupérer la liste des docteurs
  fetchDoctors(): void {
    this.doctorService.getDoctors().subscribe({
      next: (data) => {
        this.doctors = data;  // Affecter les données des docteurs à la variable 'doctors'
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des docteurs:', error);
      }
    });
  }
}
