import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../core/configs/api.token';
import { RequestData } from '../../shared/models/request-data';
@Injectable({
providedIn: 'root',
})
export class BudgetService {
private http = inject(HttpClient);
private apiBaseUrl = inject(API_URL);
public getBudgetForRequest(requestId: number): Observable<RequestData> {
return this.http.get<RequestData>(
${this.apiBaseUrl}/requests/employee/${requestId}
);
}
public createBudget(requestId: number, serviceIds: number[]): Observable<any> {
const body = { serviceIds };
return this.http.post<any>(
${this.apiBaseUrl}/requests/employee/${requestId}/budget,
body
);
}
public approveBudget(requestId: number): Observable<any> {
return this.http.post<any>(
${this.apiBaseUrl}/requests/client/${requestId}/approve,
{}
);
}
public rejectBudget(requestId: number, rejectionReason: string): Observable<any> {
const body = { reason: rejectionReason }; // ajusta se RejectionDTO tiver outro campo
return this.http.post<any>(
${this.apiBaseUrl}/requests/client/${requestId}/reject,
body
);
}
}