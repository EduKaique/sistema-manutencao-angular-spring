import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { InputPrimaryComponent } from '../../../../shared/components/input-primary/input-primary.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [
    MatButtonModule,
    InputPrimaryComponent,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false; 
  loginError: string | null = null;
  hide = signal(true);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit() {
    this.loginError = null;
    this.isLoading = true;

    if (this.loginForm.invalid) {
      this.isLoading = false;
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.authService.login(email, password).subscribe({
      next: (user) => {
        this.isLoading = false; 

        if (user) {
          console.log('Login bem-sucedido!', user);
          if (user.userAccess === 'employee') {
            this.router.navigate(['/employee-dashboard']); 
          } else if (user.userAccess === 'client') {
            this.router.navigate(['/client-dashboard']); 
          }
        } else {
          console.error('Email ou senha incorretos.');
          this.loginError = 'O e-mail ou a senha informados estão incorretos.';
        }
      },
      error: (err) => {
        this.isLoading = false; 
        console.error('Ocorreu um erro no login:', err);
        this.loginError =
          'Ocorreu um erro inesperado. Tente novamente mais tarde.';
      },
    });
    
  }

  navigate() {
    this.router.navigate(['/signup']);
  }
}
