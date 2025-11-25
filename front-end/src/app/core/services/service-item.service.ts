import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../configs/api.token'; 
import { ServiceItemDTO } from '../../shared/models/service-item.model';


@Injectable({
  providedIn: 'root'
})
export class serviceItemService {
  private http = inject(HttpClient);
  private apiBaseUrl = inject(API_URL);
  
  
  private readonly apiUrl = `${this.apiBaseUrl}/services`;

  /**
   * Lista todos os serviços disponíveis para compor o orçamento.
   * Rota: GET /api/services
   */
  getAllServices(): Observable<ServiceItemDTO[]> {
    return this.http.get<ServiceItemDTO[]>(this.apiUrl);
  }

}