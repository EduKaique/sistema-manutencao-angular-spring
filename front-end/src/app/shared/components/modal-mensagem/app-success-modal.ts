import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-modal',
  templateUrl: './app-success-modal.html',
  styleUrls: ['./app-success-modal.css'],
  imports: [CommonModule]
})
export class AppSuccessModalComponent {
  @Input() mostrar: boolean = false;
  
  @Output() mostrarChange = new EventEmitter<boolean>();
  
  @Input() titulo: string = 'Operação realizada com sucesso!';
  @Input() subtitulo: string = '';
  @Input() textoBotao: string = 'Voltar para Página Inicial';
  @Input() rotaDestino: string | any[] = '/';
  
  @Input() dadosAdicionais: string = '';

  constructor(private router: Router) {}

  fecharModal(): void {
    this.mostrar = false;
    this.mostrarChange.emit(this.mostrar);
    
    if (this.rotaDestino) {
      if (typeof this.rotaDestino === 'string') {
        this.router.navigate([this.rotaDestino]);
      } else {
        this.router.navigate(this.rotaDestino);
      }
    }
  }
}