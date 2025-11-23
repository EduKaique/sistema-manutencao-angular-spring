// src/app/core/features/maintenance/services/maintenance-request.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../configs/api.token'; 
import {MaintenanceRequestCreateDTO, MaintenanceRequestResponseDTO} from '../../shared/models/maintenance-request.models';


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


}