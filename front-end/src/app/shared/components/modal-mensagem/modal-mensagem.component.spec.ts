import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSuccessModalComponent } from './app-success-modal';

describe('ModalMensagemComponent', () => {
  let component: AppSuccessModalComponent;
  let fixture: ComponentFixture<AppSuccessModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSuccessModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppSuccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
