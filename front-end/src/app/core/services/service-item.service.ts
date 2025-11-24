import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../core/configs/api.token';
export interface ServiceItem {
id: number;
nome: string;
valorServico: number;
}
@Injectable({
providedIn: 'root'
})
export class ServiceItemService {
private http = inject(HttpClient);
private apiBaseUrl = inject(API_URL);
getAll(): Observable<ServiceItem[]> {
return this.http.get<ServiceItem[]>(${this.apiBaseUrl}/services);
}
}