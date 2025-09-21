import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { HeaderComponent } from '../../../core/layout/header/header.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

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
    MatFormFieldModule,
    MatSelectModule,
    FormsModule
  ]
})
export class BudgetDeliveryComponent {
  dialog: any;

constructor(private router: Router) {}
onVoltarPaginaInicial() {
  this.router.navigate(['/client-dashboard']);
}

  // Responsável
  responsavel: any = null;
  dataAtribuicao: string = '';
  funcionarios = [
    { nome: 'Carlos Mendel', cargo: 'Técnico em Informática' },
    { nome: 'Maria Souza', cargo: 'Técnica em Redes' },
    { nome: 'João Silva', cargo: 'Técnico em Suporte' }
  ];
  selectedFuncionario: any = null;
  dialogRef: any;

  abrirDialog(template: TemplateRef<any>) {
    this.selectedFuncionario = null;
    this.dialogRef = this.dialog.open(template, {
      disableClose: true,
      panelClass: 'custom-dialog'
    });
  }

  atribuirResponsavel() {
    this.responsavel = this.selectedFuncionario;
    this.dataAtribuicao = new Date().toLocaleString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
    this.dialogRef.close();
  }

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