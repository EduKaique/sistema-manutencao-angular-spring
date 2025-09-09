import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface RequestData {
  id: number;
  equipamento: string;
  categoria: string;
  dataCriacao: string;
  ultimaAtualizacao: string;
  status: 'Pendente' | 'Em Análise' | 'Em Andamento' | 'Finalizado' | 'Cancelado';
  descricaoDefeito: string;
}


@Injectable({
  providedIn: 'root'
})
export class RequestsService {




  private apiUrl = 'https://sua-api.com/solicitacoes';


  constructor(private http: HttpClient) { }


 
  getRequests(): Observable<RequestData[]> {
    return this.http.get<RequestData[]>(this.apiUrl);
  }


  getRequestById(id: number): Observable<RequestData> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<RequestData>(url);
  }
  deleteRequest(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }


}
