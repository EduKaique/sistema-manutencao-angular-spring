import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDashboardPageComponent } from './client-dashboard-page.component';

describe('ClientDashboardPageComponent', () => {
  let component: ClientDashboardPageComponent;
  let fixture: ComponentFixture<ClientDashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientDashboardPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'app-client-dashboard-page',
  templateUrl: './client-dashboard-page.component.html',
  styleUrls: ['./client-dashboard-page.component.css']  // 🔹 aqui é o link
})
