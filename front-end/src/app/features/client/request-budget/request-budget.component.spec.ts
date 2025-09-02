import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestBudgetComponent } from './request-budget.component';

describe('RequestBudgetComponent', () => {
  let component: RequestBudgetComponent;
  let fixture: ComponentFixture<RequestBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestBudgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
