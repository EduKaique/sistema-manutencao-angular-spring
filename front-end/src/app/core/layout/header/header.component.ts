import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../auth/services/auth.service';
import { SidebarStateService } from '../../services/sidebar-state.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-header',
  imports: [MatToolbar, MatIconModule, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  nomeDeUsuario: string = 'Nilson Nativas';

  public isEmployee$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private sidebarState: SidebarStateService
  ) {
    this.isEmployee$ = this.authService.isEmployee$;
  }

  logout() {
    this.authService.logout();
    console.log('Logout realizado com sucesso!');
  }

  isSidebarExpanded(): boolean {
    return this.sidebarState.isExpandedValue();
  }
}
