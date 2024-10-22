import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@core/models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

constructor(
  private http : HttpClient
) { }

getAllDoctor(): Observable<User>{
  return this.http.get<User>("http://localhost:8083/api/v1/doctor")
}

}
