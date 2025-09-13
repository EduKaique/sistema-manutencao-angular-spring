import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { EmployeService } from '../../services/employe.service';
import { Employee } from '../../../../shared/models/employee';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
    imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    CurrencyPipe
  ]
})
export class EmployeeListComponent implements OnInit {
  employees : Employee[] = [];
  displayedColumns: string[] = ['id', 'nome', 'cargo', 'email', 'celular', 'salario', 'actions'];

  constructor(
    private employeeService: EmployeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employees = this.employeeService.getEmployees();
  }

  openForm(employee?: Employee): void {
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      width: '400px',
      data: employee
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.loadEmployees();
        this.snackBar.open('Funcionário salvo com sucesso!', 'Fechar', {
          duration: 3000
        });
      }
    });
  }

  deleteEmployee(id: number): void {
    if(confirm('Tem certeza que deseja excluir este funcionário?')) {
      this.employeeService.deleteEmployee(id);
      this.loadEmployees();
      this.snackBar.open('Funcionário excluído com sucesso!', 'Fechar', {
        duration: 3000
      });
    }
  }
}
