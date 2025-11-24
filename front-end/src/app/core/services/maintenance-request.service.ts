// src/app/core/features/maintenance/services/maintenance-request.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../configs/api.token'; 
import {MaintenanceRequestCreateDTO, 
  MaintenanceRequestResponseDTO, 
  ClientRequestDetailDTO, 
  EmployeeRequestDetailDTO,
  RejectionDTO} from '../../shared/models/maintenance-request.models';


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


}