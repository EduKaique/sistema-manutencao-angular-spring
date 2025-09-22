import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { EmployeService } from '../../services/employe.service';
import { Employee } from '../../../../shared/models/employee';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
    imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    CurrencyPipe,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ]
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'cargo', 'email', 'celular', 'salario', 'actions'];

  dataSource = new MatTableDataSource<Employee>();

  constructor(
    private employeeService: EmployeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    const employees = this.employeeService.getEmployees();
    this.dataSource.data = employees;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

openForm(employee?: Employee): void {
  const dialogRef = this.dialog.open(EmployeeFormComponent, {
    width: '750px', 
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
