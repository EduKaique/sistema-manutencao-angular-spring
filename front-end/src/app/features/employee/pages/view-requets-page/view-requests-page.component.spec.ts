import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRequestsPageComponent } from './view-requests-page.component';

describe('ViewRequetsPageComponent', () => {
  let component: ViewRequestsPageComponent;
  let fixture: ComponentFixture<ViewRequestsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewRequestsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewRequestsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
