import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomValidators } from '../../../../shared/utils/cpf-validator';

// Angular Material Modules
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';


import { EmployeService } from '../../services/employe.service';
import { Employee, Role } from '../../../../shared/models/employee';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ],
    providers: [
    provideNativeDateAdapter()
  ],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  personalInfoForm: FormGroup;
  professionalInfoForm: FormGroup;

  isEdit = false;
  roles = Object.values(Role);

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeService,
    private dialogref: MatDialogRef<EmployeeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {
    // Etapa 1: Informações Pessoais
    this.personalInfoForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, CustomValidators.useExistingCpfValidator()]],
      dataNascimento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', Validators.required],
    });

    // Etapa 2: Informações Profissionais
    this.professionalInfoForm = this.fb.group({
      cargo: ['', Validators.required],
      salario: ['', [Validators.required, Validators.min(0.01)]],
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.isEdit = true;
      this.personalInfoForm.patchValue(this.data);
      this.professionalInfoForm.patchValue(this.data);
    }
  }

  onSubmit(): void {
    if (this.personalInfoForm.invalid || this.professionalInfoForm.invalid) {
      return;
    }

    const employeeData: Employee = {
      ...this.personalInfoForm.value,
      ...this.professionalInfoForm.value,
    };

    if (this.isEdit) {
      employeeData.id = this.data.id;
      this.employeeService.updateEmployee(employeeData);
    } else {
      this.employeeService.addEmployee(employeeData);
    }
    
    this.dialogref.close(true);
  }

  onCancel(): void {
    this.dialogref.close(false);
  }
}