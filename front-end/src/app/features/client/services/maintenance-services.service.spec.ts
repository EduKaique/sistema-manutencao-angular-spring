import { TestBed } from '@angular/core/testing';

import { MaintenanceServicesService } from './maintenance-services.service';

describe('MaintenanceServicesService', () => {
  let service: MaintenanceServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaintenanceServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
