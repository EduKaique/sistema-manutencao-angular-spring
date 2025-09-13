import { Injectable } from '@angular/core';
import { Employee, Cargo } from '../../../shared/models/employee';

const LS_KEY = "funcionarios";

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  constructor() { }

    getCargos(): { value: Cargo, label: string }[] {
    return Object.values(Cargo).map(cargo => ({
      value: cargo,
      label: cargo.toString()
    }));
  }

  getEmployees(): Employee[] {
    const employees = localStorage[LS_KEY];
    return employees ? JSON.parse(employees) : [];
  }

  getEmployeeById(id : number): Employee | undefined {
    const employees = this.getEmployees();
    return employees.find(emp => emp.id === id);
  }

  addEmployee(employee: Employee): void {
    const employees = this.getEmployees();
    employee.id = new Date().getTime();

    employees.push(employee);
    localStorage[LS_KEY] = JSON.stringify(employees);
  }

  updateEmployee(employee: Employee): void {
    const employees = this.getEmployees();
    
    employees.forEach( (obj, index, objs) => {
      if(employee.id === obj.id) {
        objs[index] = employee
      }
    });

    localStorage[LS_KEY] = JSON.stringify(employees);
  }

  deleteEmployee(id: number): void {
    let employees = this.getEmployees();

    employees = employees.filter(employee => employee.id !== id);
    localStorage[LS_KEY] = JSON.stringify(employees);
  }
}
