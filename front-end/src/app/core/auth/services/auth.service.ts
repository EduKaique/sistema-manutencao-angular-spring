import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, delay, tap, map } from 'rxjs';
import { User } from '../../../shared/models/user';
import { Client } from '../../../shared/models/client';
import { Employee } from '../../../shared/models/employee';
import { CLIENT_MOCKS, EMPLOYEE_MOCKS } from '../../../shared/mocks/user.mock';
import { Router } from '@angular/router';

type LoginResponse = Client | Employee | null;

function isEmployee(user: LoginResponse): user is Employee {
  return user !== null && 'employeeId' in user;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<LoginResponse>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  public isEmployee$: Observable<boolean> = this.currentUser$.pipe(
    map(user => isEmployee(user))
  );
  
  public isLoggedIn$: Observable<boolean> = this.currentUser$.pipe(
    map(user => user !== null)
  );

  constructor(private router: Router) {
    this.loadInitialUser();
  }

  public get currentUserValue(): LoginResponse {
    return this.currentUserSubject.value;
  }

  private loadInitialUser(): void {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      const user = JSON.parse(userJson);
      this.currentUserSubject.next(user);
    }
  }

  public login(email: string, password: string): Observable<User | null> {
    const foundEmployee = EMPLOYEE_MOCKS.find(
      (user) => user.email === email
    );
    if (foundEmployee && foundEmployee.password === password) {
      return this.handleLoginSuccess(foundEmployee);
    }

    const foundClient = CLIENT_MOCKS.find(
      (user) => user.email === email
    );
    if (foundClient && foundClient.password === password) {
      return this.handleLoginSuccess(foundClient);
    }

    return of(null).pipe(delay(1000));
  }

  private handleLoginSuccess(
    user: Client | Employee
  ): Observable<LoginResponse> {
    return of(user).pipe(
      delay(1000),
      tap((loggedInUser) => {
        localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
        this.currentUserSubject.next(loggedInUser);
      })
    );
  }
  

  public logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
