import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewResquestPageComponent } from './new-resquest-page.component';

describe('NewResquestPageComponent', () => {
  let component: NewResquestPageComponent;
  let fixture: ComponentFixture<NewResquestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewResquestPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewResquestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
