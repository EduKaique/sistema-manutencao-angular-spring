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

  /**
   * Retorna a lista de cargos disponíveis baseada no Enum Role.
   * Usado para preencher o <select> de cargos disponíveis no formulário.
   */
  getCargos(): { value: Role, label: string }[] {
    return Object.values(Role).map(role => ({
      value: role,
      label: role.toString()
    }));
  }

  /**
   * Realiza uma chamada GET para a API.
   * Retorna a lista completa de funcionários cadastrados no banco.
   */
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(API_URL);
  }

  /**
   * Busca os detalhes de um funcionário específico pelo ID.
   */
  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${API_URL}/${id}`);
  }

  /**
   * Envia um novo funcionário (POST) para o backend.
   */
  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(API_URL, employee);
  }

  /**
   * Atualiza os dados de um funcionário existente (PUT).
   */
  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${API_URL}/${employee.id}`, employee);
  }

  /**
   * Remove um funcionário pelo ID (DELETE).
   * Realiza uma exclusão lógica (inativação).
   */
  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}