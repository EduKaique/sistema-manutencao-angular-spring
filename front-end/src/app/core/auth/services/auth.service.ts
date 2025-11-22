import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import { Router } from '@angular/router';

// Interface da resposta exata do Backend (Spring Boot)
interface LoginResponseApi {
  token: string;
  userName: string;
  userRole: string;
}

// Ajustamos o tipo para usar 'userAccess' ao invés de 'userType'
type UserState = {
  id?: number;
  name: string;
  email?: string;
  userAccess: 'employee' | 'client'; // <--- CORRIGIDO AQUI (era userType)
  token: string;
} | null;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://refactored-space-fiesta-6qrxj44wpjw245xv-8080.app.github.dev/api/auth'; 
  
  private currentUserSubject = new BehaviorSubject<UserState>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // Atualizado para ler 'userAccess'
  public isEmployee$: Observable<boolean> = this.currentUser$.pipe(
    map(user => user?.userAccess === 'employee')
  );
  
  public isLoggedIn$: Observable<boolean> = this.currentUser$.pipe(
    map(user => user !== null)
  );

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadInitialUser();
  }

  public get currentUserValue(): UserState {
    return this.currentUserSubject.value;
  }

  private loadInitialUser(): void {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        this.currentUserSubject.next(user);
      } catch (e) {
        console.error('Erro ao carregar usuário', e);
        this.logout();
      }
    }
  }

  public login(email: string, password: string): Observable<UserState> {
    return this.http.post<LoginResponseApi>(`${this.apiUrl}/login`, {
      email,     
      password
    }).pipe(
      map(response => {
        // Converte a Role do Java para o seu tipo do Front
        const accessType = this.mapRoleToUserAccess(response.userRole);

        const user: UserState = {
          name: response.userName,
          userAccess: accessType, // <--- CORRIGIDO AQUI (atribuindo à propriedade correta)
          token: response.token,
        };
        
        return user;
      }),
      tap((user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('token', user!.token);
        this.currentUserSubject.next(user);
      })
    );
  }

  public logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  // Renomeei o método para ficar semântico
  private mapRoleToUserAccess(role: string): 'employee' | 'client' {
    if (role === 'ROLE_EMPLOYEE') return 'employee';
    if (role === 'ROLE_CLIENT') return 'client';
    return 'client'; 
  }
}