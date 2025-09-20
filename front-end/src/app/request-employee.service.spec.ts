import { TestBed } from '@angular/core/testing';

import { RequestEmployeeService } from './request-employee.service';

describe('RequestEmployeeService', () => {
  let service: RequestEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
