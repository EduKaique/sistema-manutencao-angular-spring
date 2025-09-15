import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
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
export class LoginPageComponent {
  loginForm: FormGroup;

  constructor(private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Email:', this.loginForm.value.email);
      console.log('Senha:', this.loginForm.value.password);
    }
  }

  navigate() {
    this.router.navigate(['/signup']);
  }
}
