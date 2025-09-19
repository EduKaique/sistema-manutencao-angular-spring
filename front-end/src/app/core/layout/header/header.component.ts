import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbar, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
     nomeDeUsuario: string = 'Nilson Nativas';

     constructor(private authService: AuthService) {}

     logout() {
        this.authService.logout();
        console.log('Logout realizado com sucesso!');
     }
}
