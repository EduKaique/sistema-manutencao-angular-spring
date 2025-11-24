import { Injectable } from '@angular/core';
import { RequestHistory } from '../../shared/models/request-history';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

const LS_CHAVE = 'requestHistory';

@Injectable({
  providedIn: 'root',
})
export class RequestHistoryService {
  constructor() {}


  
}