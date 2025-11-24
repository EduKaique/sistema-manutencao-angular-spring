import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Status } from '../../shared/models/status';
import { API_URL } from '../configs/api.token';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  private http = inject(HttpClient);
  private apiBaseUrl = inject(API_URL);
  private apiUrl = `${this.apiBaseUrl}/status-enum`;

  constructor() {}

  getAll(): Observable<Status[]> {
    return this.http.get<Status[]>(this.apiUrl);
  }

  // filtrar usando getAll()
  getById(id: number): Observable<Status | undefined> {
    return this.getAll().pipe(
      map((statuses) => statuses.find((s) => s.id === id))
    );
  }
}
