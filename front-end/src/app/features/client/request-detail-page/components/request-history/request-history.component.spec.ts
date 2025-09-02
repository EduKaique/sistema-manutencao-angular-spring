import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestHistoryComponent } from './request-history.component';

describe('RequestHistoryComponent', () => {
  let component: RequestHistoryComponent;
  let fixture: ComponentFixture<RequestHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
