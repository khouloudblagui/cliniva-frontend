import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { AuthenticationRequest } from '@core/models/authentication-request';
import { AuthenticationResponse } from '@core/models/authentication-response';
import { Checkemail } from '@core/models/checkemail';
import { RegisterRequest } from '@core/models/register-request';



@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private baseUrl = environment.baseUrl + '/auth';
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private router: Router, private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  isUserAuthenticated(): boolean {
    if (localStorage.getItem('accessToken')) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  login(authenticationRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    const url = `${this.baseUrl}/authenticate`;
    return this.http.post<AuthenticationResponse>(url, authenticationRequest).pipe(
      map((response) => {
        this.setUserToken(response);
        return response;
      })
    );
  }

  register(registerRequest: RegisterRequest): Observable<Checkemail> {
    const url = `${this.baseUrl}/register`;
    return this.http.post<Checkemail>(url, registerRequest);
  }

  setUserToken(authenticationResponse: AuthenticationResponse): void {
    localStorage.setItem('accessToken', authenticationResponse.accessToken);
    localStorage.setItem('refreshToken', authenticationResponse.refreshToken);
    localStorage.setItem('currentUser', JSON.stringify(authenticationResponse.user));
    this.currentUserSubject.next(authenticationResponse.user);
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}








/*
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<User>(`${environment.apiUrl}/authenticate`, {
        username,
        password,
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes

          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(this.currentUserValue);
    return of({ success: false });
  }
}*/
