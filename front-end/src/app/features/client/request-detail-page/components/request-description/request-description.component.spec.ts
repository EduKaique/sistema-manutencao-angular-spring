import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDescriptionComponent } from './request-description.component';

describe('RequestDescriptionComponent', () => {
  let component: RequestDescriptionComponent;
  let fixture: ComponentFixture<RequestDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestDescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
