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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ViaCepService, Endereco } from '../../../services/viacep.service';
import { AuthService } from '../../services/auth.service';
import { AppSuccessModalComponent } from '../../../../shared/components/modal-mensagem/app-success-modal';
import { RegisterRequest } from '../../../../shared/models/register-request';
import { CustomValidators } from '../../../../shared/utils/cpf-validator';

@Component({
  selector: 'app-signup-page',
  imports: [
    InputPrimaryComponent,
    ReactiveFormsModule,
    MatStepperModule,
    MatIconModule,
    MatDialogModule,
    AppSuccessModalComponent,
  ],
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
})
export class SignupPageComponent {
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  endereco?: Endereco;
  showModal = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private viaCepService: ViaCepService
  ) {}

  ngOnInit(): void {
    this.firstFormGroup = this.fb.group({
      nameUser: ['', [Validators.required, Validators.minLength(3)]],
      cpfUser:['', [Validators.required, CustomValidators.useExistingCpfValidator()]],
      phoneUser: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.secondFormGroup = this.fb.group({
      cep: ['', [Validators.required]],
      address: ['', [Validators.required]],
      number: ['', [Validators.required]],
      complement: [''],
      neighborhood: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
    });
  }


  onSubmit(): void {
  if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      const personalData = this.firstFormGroup.value;
      const addressData = this.secondFormGroup.value;

      const removeNonDigits = (value: string) => value.replace(/\D/g, '');

      const requestData: RegisterRequest = {
        name: personalData.nameUser,
        cpf: removeNonDigits(personalData.cpfUser),
        email: personalData.email,
        phoneNumber: removeNonDigits(personalData.phoneUser),
        zipCode: removeNonDigits(addressData.cep),     
        street: addressData.address,    
        number: addressData.number,
        complement: addressData.complement,
        neighborhood: addressData.neighborhood,
        city: addressData.city,
        state: addressData.state
      };
      console.log(requestData);

      this.authService.signup(requestData).subscribe({
        next: () => {
          console.log('Cadastro realizado com sucesso!');
          this.showModal = true;
        },
        error: (err) => {
          console.error('Erro no cadastro:', err);
        }
      });
    } else {
      this.firstFormGroup.markAllAsTouched();
      this.secondFormGroup.markAllAsTouched();
    }
  }

  navigate() {
    this.router.navigate(['/login']);
  }

  searchCep() {
    const cep = this.secondFormGroup.get('cep')?.value as string | null;
    if (!cep) return;

    this.viaCepService.buscarCep(cep).subscribe({
      next: (res) => {
        this.endereco = res;
        this.secondFormGroup.patchValue({
          address: res.logradouro || '',
          neighborhood: res.bairro || '',
          city: res.localidade || '',
          state: res.uf || '',
        });
      },
      error: (err) => console.error('Erro ao buscar CEP', err),
    });
  }

  get isCepValid(): boolean {
    const cep = this.secondFormGroup.get('cep')?.value as string | null;
    if (!cep) return false;
    const digits = cep.replace(/\D/g, '');
    return digits.length === 8;
  }
}
