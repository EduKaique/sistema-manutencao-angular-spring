import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRequetsPageComponent } from './view-requets-page.component';

describe('ViewRequetsPageComponent', () => {
  let component: ViewRequetsPageComponent;
  let fixture: ComponentFixture<ViewRequetsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewRequetsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRequetsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
