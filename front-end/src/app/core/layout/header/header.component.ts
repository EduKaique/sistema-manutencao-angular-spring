import { Component, HostListener, ElementRef } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../auth/services/auth.service';
import { SidebarStateService } from '../../services/sidebar-state.service';
import { Observable } from 'rxjs';
import { CommonModule, AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-header',
  imports: [CommonModule, MatToolbar, MatIconModule, AsyncPipe, MatButtonModule, MatBadgeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  nomeDeUsuario: string = 'Nilson Nativas';

  public isEmployee$: Observable<boolean>;

   painelVisivel = false;
  
  notificacoes = [
    { id: 1, titulo: 'Novo funcionário cadastrado', descricao: 'Brenda foi adicionada à equipe.', lida: false },
    { id: 2, titulo: 'Atualização do Sistema', descricao: 'O sistema será atualizado hoje às 23h.', lida: false },
    { id: 3, titulo: 'Pagamento Confirmado', descricao: 'Seu último pagamento foi processado.', lida: true }
  ];

  constructor(
    private authService: AuthService,
    private sidebarState: SidebarStateService,
    private elementRef: ElementRef
  ) {
    this.isEmployee$ = this.authService.isEmployee$;
  }

    @HostListener('document:click', ['$event'])
    onClickOutside(event: Event) {
    // Verifica se o painel está visível E se o clique não ocorreu dentro do componente do header
    if (this.painelVisivel && !this.elementRef.nativeElement.contains(event.target)) {
      this.painelVisivel = false;
    }
  }

  logout() {
    this.authService.logout();
    console.log('Logout realizado com sucesso!');
  }

  isSidebarExpanded(): boolean {
    return this.sidebarState.isExpandedValue();
  }

  togglePainelNotificacoes(): void {
    this.painelVisivel = !this.painelVisivel;
  }

  get unreadCount(): number {
    return this.notificacoes.filter(n => !n.lida).length;
  }

  marcarComoLida(notificacao: any): void {
    notificacao.lida = true;
  }

}
