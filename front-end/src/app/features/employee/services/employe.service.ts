import { Injectable } from '@angular/core';
import { Employee, Role } from '../../../shared/models/employee';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/employees';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  constructor(private http: HttpClient) { }

    getCargos(): { value: Role, label: string }[] {
    return Object.values(Role).map(role => ({
      value: role,
      label: role.toString()
    }));
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(API_URL);
  }

  getEmployeeById(id : number): Observable<Employee> {
    return this.http.get<Employee>(`${API_URL}/${id}`);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(API_URL, employee);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${API_URL}/${employee.id}`, employee);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}
