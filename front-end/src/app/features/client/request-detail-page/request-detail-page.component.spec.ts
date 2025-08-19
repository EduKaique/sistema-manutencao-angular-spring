import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDetailPageComponent } from './request-detail-page.component';

describe('RequestDetailPageComponent', () => {
  let component: RequestDetailPageComponent;
  let fixture: ComponentFixture<RequestDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestDetailPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
