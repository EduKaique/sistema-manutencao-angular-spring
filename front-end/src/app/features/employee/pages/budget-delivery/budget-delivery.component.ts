<<<<<<< HEAD:front-end/src/app/features/employee/budget-delivery/budget-delivery.component.ts
import { ChangeDetectionStrategy, Component, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

=======
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
>>>>>>> 5bf62ced9a4dfde283f2724b78f8fe9a639a17e1:front-end/src/app/features/employee/pages/budget-delivery/budget-delivery.component.ts
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
<<<<<<< HEAD:front-end/src/app/features/employee/budget-delivery/budget-delivery.component.ts
=======
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
>>>>>>> 5bf62ced9a4dfde283f2724b78f8fe9a639a17e1:front-end/src/app/features/employee/pages/budget-delivery/budget-delivery.component.ts
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
<<<<<<< HEAD:front-end/src/app/features/employee/budget-delivery/budget-delivery.component.ts
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from '../../../core/layout/header/header.component';
=======
import { ChangeDetectorRef } from '@angular/core';
import { RequestService } from '../../../../core/services/request.service';
import { Request } from '../../../../shared/models/request';
>>>>>>> 5bf62ced9a4dfde283f2724b78f8fe9a639a17e1:front-end/src/app/features/employee/pages/budget-delivery/budget-delivery.component.ts

@Component({
  selector: 'app-budget-delivery',
  templateUrl: './budget-delivery.component.html',
  styleUrls: ['./budget-delivery.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
<<<<<<< HEAD:front-end/src/app/features/employee/budget-delivery/budget-delivery.component.ts
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatDialogModule,
    HeaderComponent
  ]
})
export class BudgetDeliveryComponent {
=======
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule,
  ],
})
export class BudgetDeliveryComponent implements OnInit {
  request: Request | undefined;
  currentRequestId!: number;

>>>>>>> 5bf62ced9a4dfde283f2724b78f8fe9a639a17e1:front-end/src/app/features/employee/pages/budget-delivery/budget-delivery.component.ts
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private requestService: RequestService,
    private route: ActivatedRoute
  ) {}

<<<<<<< HEAD:front-end/src/app/features/employee/budget-delivery/budget-delivery.component.ts
  onVoltarPaginaInicial() {
    this.router.navigate(['/client-dashboard']);
=======
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.currentRequestId = Number(id);
      this.request = this.requestService.buscarPorId(Number(id));
    }
  }

  onVoltarPaginaInicial() {
    this.router.navigate(['/employee/dashboard']);
>>>>>>> 5bf62ced9a4dfde283f2724b78f8fe9a639a17e1:front-end/src/app/features/employee/pages/budget-delivery/budget-delivery.component.ts
  }

  // Responsável
  responsavel: any = null;
  dataAtribuicao: string = '';
  funcionarios = [
    { nome: 'Carlos Mendel', cargo: 'Técnico em Informática' },
    { nome: 'Maria Souza', cargo: 'Técnica em Redes' },
    { nome: 'João Silva', cargo: 'Técnico em Suporte' },
  ];
  selectedFuncionario: any = null;
  dialogRef: any;

  abrirDialog(template: TemplateRef<any>) {
    this.selectedFuncionario = this.responsavel ?? undefined;
    this.dialogRef = this.dialog.open(template, {
      disableClose: true,
      panelClass: 'custom-dialog',
    });
  }

  atribuirResponsavel() {
    this.responsavel = this.selectedFuncionario;
    this.dataAtribuicao = this.selectedFuncionario
      ? new Date().toLocaleString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      : '';
    this.dialogRef.close();
    this.cdr.markForCheck();
  }

  cancelarDialog() {
    this.dialogRef.close();
  }

<<<<<<< HEAD:front-end/src/app/features/employee/budget-delivery/budget-delivery.component.ts
  // Detalhes
=======
>>>>>>> 5bf62ced9a4dfde283f2724b78f8fe9a639a17e1:front-end/src/app/features/employee/pages/budget-delivery/budget-delivery.component.ts
  detalhes = {
    id: '001',
    data: new Date('2025-08-27T12:18:54'),
    status: 'ABERTA',
    item: 'Notebook Dell Inspiron 15',
    categoria: 'Notebook',
    autor: 'Nilson Nativas',
    defeito:
      'O equipamento liga, mas a tela permanece preta (sem imagem). O LED indicador de energia acende e é possível ouvir o som da ventoinha em funcionamento, mas não há qualquer sinal de vídeo. O problema persiste mesmo após reiniciar o dispositivo várias vezes.',
  };

<<<<<<< HEAD:front-end/src/app/features/employee/budget-delivery/budget-delivery.component.ts
  // Abas
=======
>>>>>>> 5bf62ced9a4dfde283f2724b78f8fe9a639a17e1:front-end/src/app/features/employee/pages/budget-delivery/budget-delivery.component.ts
  selectedTab = 0;

  // Orçamento
  temOrcamento = false;
<<<<<<< HEAD:front-end/src/app/features/employee/budget-delivery/budget-delivery.component.ts
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
=======
  valorOrcamento = 520.0;
  servicosInclusos =
    'Diagnóstico técnico, Substituição do cabo flat da tela, Mão de obra, Limpeza interna + pasta térmica';

  temManutencao = false;
  descricaoManutencao =
    'Identifiquei que o problema estava em um dos módulos de memória RAM, que impedia a exibição de vídeo. Após substituir o módulo com defeito, o equipamento voltou a funcionar normalmente.';
  orientacaoCliente = 'N/A';
}
>>>>>>> 5bf62ced9a4dfde283f2724b78f8fe9a639a17e1:front-end/src/app/features/employee/pages/budget-delivery/budget-delivery.component.ts
