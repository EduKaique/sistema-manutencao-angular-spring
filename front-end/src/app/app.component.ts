import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AsyncPipe } from '@angular/common'; 
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/layout/header/header.component';
import { SideBarComponent } from './core/layout/side-bar/side-bar.component';
import { AuthService } from './core/auth/services/auth.service';
import { Observable } from 'rxjs'; 
import { NgxSpinnerModule } from 'ngx-spinner';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, SideBarComponent, AsyncPipe, NgxSpinnerModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front-end';

  public isEmployee$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isEmployee$ = this.authService.isEmployee$;

  }
}
