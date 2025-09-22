import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDashboardPageComponent } from './employee-dashboard-page.component';

describe('EmployeeDashboardPageComponent', () => {
  let component: EmployeeDashboardPageComponent;
  let fixture: ComponentFixture<EmployeeDashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeDashboardPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
