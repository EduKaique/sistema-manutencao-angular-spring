import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulSignupComponent } from './successful-signup.component';

describe('SuccessfulSignupComponent', () => {
  let component: SuccessfulSignupComponent;
  let fixture: ComponentFixture<SuccessfulSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessfulSignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessfulSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
