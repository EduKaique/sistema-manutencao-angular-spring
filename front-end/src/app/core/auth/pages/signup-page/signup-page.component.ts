import { Component, inject } from '@angular/core';
import { InputPrimaryComponent } from '../../../../shared/components/input-primary/input-primary.component';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CpfPipesPipe } from '../../../../shared/pipes/cpf.pipes.pipe';
import { MatDialog } from '@angular/material/dialog';
import { AppSuccessModalComponent } from '../../../../shared/components/modal-mensagem/app-success-modal';
import { SuccessfulSignupComponent } from './successful-signup/successful-signup.component';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [
    InputPrimaryComponent,
    ReactiveFormsModule,
    MatStepperModule,
    MatIconModule,
    CpfPipesPipe,
  ],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css',
})
export class SignupPageComponent {
  private _formBuilder = inject(FormBuilder);

  constructor(private router: Router, private dialog: MatDialog) {}

  // Primeiro Step: dados pessoais
  firstFormGroup: FormGroup = this._formBuilder.group({
    nameUser: ['', [Validators.required, Validators.minLength(3)]],
    cpfUser: ['', [Validators.required]],
    phoneUser: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });

  // Segundo Step: endereço
  secondFormGroup: FormGroup = this._formBuilder.group({
    cep: ['', [Validators.required]],
    address: ['', [Validators.required]],
    number: ['', [Validators.required]],
    complement: [''],
    neighborhood: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
  });

  onSubmit(): void {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      const formData = {
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value,
      };
      console.log('Dados do formulário:', formData);

    }
    const dialogMessageSucess = this.dialog.open(SuccessfulSignupComponent, {
        width: '565px',
        disableClose: true,
      });

      dialogMessageSucess.afterClosed().subscribe(() => {
        this.navigate();
      });
  }

  navigate() {
    this.router.navigate(['/login']);
  }
}
