import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPanelComponent } from './payment-panel.component';

describe('PaymentPanelComponent', () => {
  let component: PaymentPanelComponent;
  let fixture: ComponentFixture<PaymentPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
