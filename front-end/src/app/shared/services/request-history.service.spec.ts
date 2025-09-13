import { TestBed } from '@angular/core/testing';

import { RequestHistoryService } from './request-history.service';

describe('RequestHistoryService', () => {
  let service: RequestHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
