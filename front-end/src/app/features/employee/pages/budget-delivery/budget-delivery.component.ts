import { ChangeDetectionStrategy, Component, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from '../../../core/layout/header/header.component';

@Component({
  selector: 'app-budget-delivery',
  templateUrl: './budget-delivery.component.html',
  styleUrls: ['./budget-delivery.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatDialogModule,
    HeaderComponent
  ]
})
export class BudgetDeliveryComponent {
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

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
    this.selectedFuncionario = this.responsavel ?? undefined;
    this.dialogRef = this.dialog.open(template, {
      disableClose: true,
      panelClass: 'custom-dialog'
    });
  }

  atribuirResponsavel() {
    this.responsavel = this.selectedFuncionario;
    this.dataAtribuicao = this.selectedFuncionario
      ? new Date().toLocaleString('pt-BR', {
          day: '2-digit', month: '2-digit', year: 'numeric',
          hour: '2-digit', minute: '2-digit', second: '2-digit'
        })
      : '';
    this.dialogRef.close();
    this.cdr.markForCheck();
  }

  cancelarDialog() {
    this.dialogRef.close();
  }

  // Detalhes
  detalhes = {
    id: '001',
    data: new Date('2025-08-27T12:18:54'),
    status: 'ABERTA',
    item: 'Notebook Dell Inspiron 15',
    categoria: 'Notebook',
    autor: 'Nilson Nativas',
    defeito: 'O equipamento liga, mas a tela permanece preta (sem imagem). O LED indicador de energia acende e é possível ouvir o som da ventoinha em funcionamento, mas não há qualquer sinal de vídeo. O problema persiste mesmo após reiniciar o dispositivo várias vezes.'
  };

  // Abas
  selectedTab = 0;

  // Orçamento
  temOrcamento = false;
  valorOrcamento = 520.00;
  servicosInclusos = 'Diagnóstico técnico, Substituição do cabo flat da tela, Mão de obra, Limpeza interna + pasta térmica';

  // Manutenção
  temManutencao = true;
  descricaoManutencao = 'Identifiquei que o problema estava em um dos módulos de memória RAM, que impedia a exibição de vídeo. Após substituir o módulo com defeito, o equipamento voltou a funcionar normalmente.';
  orientacaoCliente = 'N/A';

  // Dialog de Orçamento
  servicosDisponiveis = [
    { id: 1, nome: 'Diagnóstico técnico', valor: 100.00 },
    { id: 2, nome: 'Substituição do cabo flat da tela', valor: 250.00 },
    { id: 3, nome: 'Mão de obra', valor: 150.00 },
    { id: 4, nome: 'Limpeza interna + pasta térmica', valor: 70.00 }
  ];
  servicosSelecionados: Array<{ id: number; nome: string; valor: number }> = [];
  valorTotal = 0;
  dialogOrcamentoRef: any;

  abrirDialogOrcamento(template: TemplateRef<any>) {
    // Reset
    this.servicosSelecionados = [];
    this.valorTotal = 0;

    this.dialogOrcamentoRef = this.dialog.open(template, {
      disableClose: true,
      panelClass: 'custom-dialog'
    });
  }

  fecharDialogOrcamento() {
    if (this.dialogOrcamentoRef) {
      this.dialogOrcamentoRef.close();
    }
  }

  atualizarTotal() {
    this.valorTotal = this.servicosSelecionados.reduce((acc, s) => acc + s.valor, 0);
    this.cdr.markForCheck();
  }

  confirmarOrcamento() {
    this.temOrcamento = true;
    this.valorOrcamento = this.valorTotal;
    this.servicosInclusos = this.servicosSelecionados.map(s => s.nome).join(', ');
    this.fecharDialogOrcamento();
    this.cdr.markForCheck();
  }
}
