import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { HeaderComponent } from '../../../core/layout/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-budget-delivery',
  templateUrl: './budget-delivery.component.html',
  styleUrls: ['./budget-delivery.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    HeaderComponent,
    CommonModule,
  ]
})
export class BudgetDeliveryComponent {
  detalhes = {
    id: '001',
    data: new Date('2025-08-27T12:18:54'),
    status: 'ABERTA',
    item: 'Notebook Dell Inspiron 15',
    categoria: 'Notebook',
    autor: 'Nilson Nativas',
    defeito: 'O equipamento liga, mas a tela permanece preta (sem imagem). O LED indicador de energia acende e é possível ouvir o som da ventoinha em funcionamento, mas não há qualquer sinal de vídeo. O problema persiste mesmo após reiniciar o dispositivo várias vezes.'
  };

  // Para o card de orçamento/manutenção
  selectedTab = 0;
  temOrcamento = false;
  valorOrcamento = 520.00;
  servicosInclusos = 'Diagnóstico técnico, Substituição do cabo flat da tela, Mão de obra, Limpeza interna + pasta térmica';

    // Manutenção
  temManutencao = false;
  descricaoManutencao = 'Identifiquei que o problema estava em um dos módulos de memória RAM, que impedia a exibição de vídeo. Após substituir o módulo com defeito, o equipamento voltou a funcionar normalmente.';
  orientacaoCliente = 'N/A';
}