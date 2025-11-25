// src/app/core/features/maintenance/services/maintenance-request.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../configs/api.token'; 
import {MaintenanceRequestCreateDTO, MaintenanceRequestResponseDTO} from '../../shared/models/maintenance-request.models';
import { MaintenanceRecord } from '../../shared/models/maintenance-record';


@Injectable({
  providedIn: 'root'
})
export class MaintenanceRequestService {
  private http = inject(HttpClient);
  private apiBaseUrl = inject(API_URL);
  
  private readonly ENDPOINT = `${this.apiBaseUrl}/requests`;

  /**
   * Cria uma nova solicitação.
   * Payload: { equipmentName, defectDescription, categoryId }
   */
  create(data: MaintenanceRequestCreateDTO): Observable<MaintenanceRequestResponseDTO> {
    return this.http.post<MaintenanceRequestResponseDTO>(this.ENDPOINT, data);
  }

  /**
   * Busca solicitações do cliente logado.
   * Retorna lista com status coloridos e nomes formatados.
   */
  getAllClientRequests(): Observable<MaintenanceRequestResponseDTO[]> {
    return this.http.get<MaintenanceRequestResponseDTO[]>(`${this.ENDPOINT}/client`);
  }

  /**
   * Busca solicitações para o funcionário (visão geral).
   */
  getAllEmployeeRequests(): Observable<MaintenanceRequestResponseDTO[]> {
    return this.http.get<MaintenanceRequestResponseDTO[]>(`${this.ENDPOINT}/employee`);
  }

  // ===== Métodos de MaintenanceRecord =====

  /**
   * Busca todos os registros de manutenção
   */
  getAllMaintenanceRecords(): Observable<MaintenanceRecord[]> {
    return this.http.get<MaintenanceRecord[]>(`${this.apiBaseUrl}/maintenance-records`);
  }

  /**
   * Busca um registro de manutenção por ID
   */
  getMaintenanceRecordById(id: number): Observable<MaintenanceRecord> {
    return this.http.get<MaintenanceRecord>(`${this.apiBaseUrl}/maintenance-records/${id}`);
  }

  /**
   * Cria um novo registro de manutenção vinculado a uma solicitação
   */
  createMaintenanceRecord(record: MaintenanceRecord, requestId: number): Observable<MaintenanceRecord> {
    return this.http.post<MaintenanceRecord>(`${this.apiBaseUrl}/maintenance-records/${requestId}`, record);
  }

  /**
   * Atualiza um registro de manutenção existente
   */
  updateMaintenanceRecord(id: number, record: MaintenanceRecord): Observable<MaintenanceRecord> {
    return this.http.put<MaintenanceRecord>(`${this.apiBaseUrl}/maintenance-records/${id}`, record);
  }

  /**
   * Remove um registro de manutenção
   */
  deleteMaintenanceRecord(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/maintenance-records/${id}`);
  }

  /**
   * Busca o registro de manutenção associado a uma solicitação específica
   */
  getMaintenanceRecordByRequestId(requestId: number): Observable<MaintenanceRecord> {
    return this.http.get<MaintenanceRecord>(`${this.apiBaseUrl}/maintenance-records/by-request/${requestId}`);
  }

}