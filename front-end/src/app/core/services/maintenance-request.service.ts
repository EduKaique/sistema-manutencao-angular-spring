import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../configs/api.token'; 
import {MaintenanceRequestCreateDTO, MaintenanceRequestResponseDTO, ClientRequestDetailDTO, EmployeeRequestDetailDTO, RejectionDTO} from '../../shared/models/maintenance-request.models';
import { MaintenanceRecordDTO } from '../../shared/models/maintenance-record.model'
import { BudgetCreateDTO } from '../../shared/models/budget.model';


@Injectable({
  providedIn: 'root'
})
export class MaintenanceRequestService {
  private http = inject(HttpClient);
  private apiBaseUrl = inject(API_URL);
  
  private readonly apiUrl = `${this.apiBaseUrl}/requests`;

  /**
   * Cria uma nova solicitação.
   * Payload: { equipmentName, defectDescription, categoryId }
   */
  create(data: MaintenanceRequestCreateDTO): Observable<MaintenanceRequestResponseDTO> {
    return this.http.post<MaintenanceRequestResponseDTO>(this.apiUrl, data);
  }

  /**
   * Busca solicitações do cliente logado.
   * Retorna lista com status coloridos e nomes formatados.
   */
  getAllClientRequests(): Observable<MaintenanceRequestResponseDTO[]> {
    return this.http.get<MaintenanceRequestResponseDTO[]>(`${this.apiUrl}/client`);
  }

  /**
   * Busca solicitações para o funcionário (visão geral).
   */
  getAllEmployeeRequests(): Observable<MaintenanceRequestResponseDTO[]> {
    return this.http.get<MaintenanceRequestResponseDTO[]>(`${this.apiUrl}/employee`);
  }

  /**
   * Busca os detalhes completos de uma solicitação específica (Visão Cliente).
   * Endpoint: GET /requests/client/{id}
   */
  getRequestByIdForClient(id: number): Observable<ClientRequestDetailDTO> {
    return this.http.get<ClientRequestDetailDTO>(`${this.apiUrl}/client/${id}`);
  }

  /**
   * Busca os detalhes completos de uma solicitação específica (Visão Funcionário).
   * Endpoint: GET /requests/employee/{id}
   */
  getRequestByIdForEmployee(id: number): Observable<EmployeeRequestDetailDTO> {
    return this.http.get<EmployeeRequestDetailDTO>(`${this.apiUrl}/employee/${id}`);
  }
  
   /**
   * Atribuir ou Redirecionar responsável.
   * Rota: POST /requests/employee/{id}/redirect?targetEmployeeId=X
   */
  redirectMaintenance(requestId: number, targetEmployeeId: number): Observable<MaintenanceRequestResponseDTO> {
    const url = `${this.apiUrl}/employee/${requestId}/redirect`;
    
    const params = new HttpParams().set('targetEmployeeId', targetEmployeeId.toString());

    return this.http.post<MaintenanceRequestResponseDTO>(url, null, { params });
  }

  /**
   * Efetuar Orçamento.
   * Rota: POST /requests/employee/{id}/budget
   */
  createBudget(requestId: number, budgetData: BudgetCreateDTO): Observable<MaintenanceRequestResponseDTO> {
    const url = `${this.apiUrl}/employee/${requestId}/budget`;
    return this.http.post<MaintenanceRequestResponseDTO>(url, budgetData);
  }

  /**
   * Aprova o orçamento da solicitação.
   * POST requests/client/{id}/approve
   */
  approveBudget(requestId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/client/${requestId}/approve`, {});
  }

  /**
   * Recusa o orçamento da solicitação.
   * POST requests/client/{id}/reject
   */
  rejectBudget(requestId: number, reason: string): Observable<void> {
    const payload: RejectionDTO = { reason };
    return this.http.post<void>(`${this.apiUrl}/client/${requestId}/reject`, payload);
  }


  /**
   * Efetuar Manutenção.
   * Rota: POST /requests/employee/{id}/maintenance
   */
  executeMaintenance(requestId: number, maintenanceData: MaintenanceRecordDTO): Observable<MaintenanceRequestResponseDTO> {
    const url = `${this.apiUrl}/employee/${requestId}/maintenance`;
    return this.http.post<MaintenanceRequestResponseDTO>(url, maintenanceData);
  }

  /**
   * Efetuar Pagamento.
   * Rota: POST /requests/client/{id}/pay
   */
  payRequest(requestId: number): Observable<MaintenanceRequestResponseDTO> { 
    return this.http.post<MaintenanceRequestResponseDTO>(`${this.apiUrl}/client/${requestId}/pay`, {});
  }

  /**  
   * Finaliza a solicitação.
   * Rota: POST /requests/employee/{id}/finalize
   */
  finalizeRequest(requestId: number): Observable<MaintenanceRequestResponseDTO> {
    return this.http.post<MaintenanceRequestResponseDTO>(`${this.apiUrl}/employee/${requestId}/finalize`, {});
  }

}