import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetDeliveryComponent } from './budget-delivery.component';

describe('BudgetDeliveryComponent', () => {
  let component: BudgetDeliveryComponent;
  let fixture: ComponentFixture<BudgetDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetDeliveryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
