import { ChangeDetectionStrategy, Component, TemplateRef, inject, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
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

import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

// AJUSTE os paths abaixo conforme sua estrutura de pastas
import { StatusService } from '../../../../core/services/status.service';
import { RequestService } from '../../../../core/services/request.service';

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
    MatDialogModule
  ]
})
export class BudgetDeliveryComponent {
  // Services e Router
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private cdr = inject(ChangeDetectorRef);

  // NOVO: services e rota (signals)
  private statusService = inject(StatusService);
  private requestService = inject(RequestService);
  private route = inject(ActivatedRoute);

  // Lê o id da rota: /.../:id ou /.../:requestId
  private routeId = toSignal(
    this.route.paramMap.pipe(map(pm => pm.get('id') ?? pm.get('requestId'))),
    { initialValue: null }
  );

  // Signals vindos dos serviços (mesmo padrão do dashboard)
  private statuses = toSignal(this.statusService.getAll(), { initialValue: [] as Status[] }); // Signal<Status[]>
  private requests = this.requestService.listarTodos(); // Signal<Request[]>

  // Seleciona a solicitação corrente pelo id da rota
  private selectedRequest = computed(() => {
    const id = this.routeId();
    const reqs = this.requests();
    if (!id || !reqs?.length) return undefined;
    return reqs.find(r => String((r as any).id) === String(id));
  });

  // Nome do status corrente
  private statusName = computed(() => {
    const req = this.selectedRequest();
    const list = this.statuses();
    if (!req || !list?.length) return this.detalhes.status;
    const st = list.find(s => s.id === (req as any).statusId);
    return (st as any)?.nome ?? (st as any)?.name ?? this.detalhes.status;
  });

  // Navegação
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

  // Detalhes (preenchidos automaticamente pelo effect)
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
  valorOrcamento = 520.0;
  servicosInclusos =
    'Diagnóstico técnico, Substituição do cabo flat da tela, Mão de obra, Limpeza interna + pasta térmica';

  // Manutenção
  temManutencao = false;
  descricaoManutencao =
    'Identifiquei que o problema estava em um dos módulos de memória RAM, que impedia a exibição de vídeo. Após substituir o módulo com defeito, o equipamento voltou a funcionar normalmente.';
  orientacaoCliente = 'N/A';

  // Dialog de Orçamento
  servicosDisponiveis = [
    { id: 1, nome: 'Diagnóstico técnico', valor: 100.0 },
    { id: 2, nome: 'Substituição do cabo flat da tela', valor: 250.0 },
    { id: 3, nome: 'Mão de obra', valor: 150.0 },
    { id: 4, nome: 'Limpeza interna + pasta térmica', valor: 70.0 }
  ];
  servicosSelecionados: Array<{ id: number; nome: string; valor: number }> = [];
  valorTotal = 0;
  dialogOrcamentoRef: any;

  abrirDialogOrcamento(template: TemplateRef<any>) {
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
    this.valorTotal = this.servicosSelecionados.reduce(
      (acc, s) => acc + s.valor,
      0
    );
    this.cdr.markForCheck();
  }

  confirmarOrcamento() {
    this.temOrcamento = true;
    this.valorOrcamento = this.valorTotal;
    this.servicosInclusos = this.servicosSelecionados
      .map((s) => s.nome)
      .join(', ');
    this.fecharDialogOrcamento();
    this.cdr.markForCheck();
  }

  // Dialog de Manutenção
  manutencaoDescricaoInput = '';
  manutencaoOrientacaoInput = '';
  manutencaoDialogRef: any;

  abrirDialogManutencao(template: TemplateRef<any>) {
    this.manutencaoDescricaoInput = this.temManutencao
      ? this.descricaoManutencao
      : '';
    this.manutencaoOrientacaoInput = this.temManutencao
      ? this.orientacaoCliente
      : '';

    this.manutencaoDialogRef = this.dialog.open(template, {
      disableClose: true,
      panelClass: 'custom-dialog'
    });
  }

  fecharDialogManutencao() {
    if (this.manutencaoDialogRef) {
      this.manutencaoDialogRef.close();
    }
  }

  isManutencaoFormValid(): boolean {
    return (
      this.manutencaoDescricaoInput.trim().length > 0 &&
      this.manutencaoOrientacaoInput.trim().length > 0
    );
  }

  confirmarManutencao() {
    this.temManutencao = true;
    this.descricaoManutencao = this.manutencaoDescricaoInput.trim();
    this.orientacaoCliente = this.manutencaoOrientacaoInput.trim();

    this.fecharDialogManutencao();
    this.cdr.markForCheck();
  }

  // Finalização
  finalizacaoDialogRef: any;
  dataFinalizacao = '';

  canFinalizarSolicitacao(): boolean {
    return !!this.responsavel && this.temOrcamento && this.temManutencao;
  }

  abrirDialogFinalizacao(template: TemplateRef<any>) {
    this.detalhes.status = 'PAGA';
    this.dataFinalizacao = new Date().toLocaleString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });

    this.finalizacaoDialogRef = this.dialog.open(template, {
      disableClose: true,
      panelClass: 'custom-dialog'
    });

    this.cdr.markForCheck();
  }

  voltarPaginaInicialPosFinalizacao() {
    if (this.finalizacaoDialogRef) {
      this.finalizacaoDialogRef.close();
    }
    this.router.navigate(['/client-dashboard']);
  }

  // ====== NOVO: effect para popular automaticamente a tela pelos dados do serviço ======
  private _syncEffect = effect(() => {
    const req: any = this.selectedRequest();
    const statusLabel = this.statusName();

    if (!req) return;

    // Detalhes
    this.detalhes = {
      id: String(req.id ?? this.detalhes.id),
      data: new Date(req.createdAt ?? req.data ?? this.detalhes.data),
      status: statusLabel ?? this.detalhes.status,
      item: req.item ?? req.title ?? this.detalhes.item,
      categoria: req.categoria ?? req.category ?? this.detalhes.categoria,
      autor: req.autor ?? req.author?.name ?? this.detalhes.autor,
      defeito: req.defeito ?? req.description ?? this.detalhes.defeito
    };

    // Responsável
    const resp = req.responsavel ?? req.assignee ?? null;
    this.responsavel = resp;
    this.dataAtribuicao =
      req.assignedAt
        ? new Date(req.assignedAt).toLocaleString('pt-BR', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
          })
        : (resp ? this.dataAtribuicao : '');

    // Orçamento
    const orc = req.orcamento ?? req.budget ?? null;
    this.temOrcamento = !!orc;
    this.valorOrcamento = orc?.total ?? this.valorOrcamento;
    this.servicosInclusos = orc?.servicos?.map((s: any) => s.nome ?? s.name).join(', ') ?? this.servicosInclusos;

    // Manutenção
    const man = req.manutencao ?? req.maintenance ?? null;
    this.temManutencao = !!man;
    this.descricaoManutencao = man?.descricao ?? man?.description ?? this.descricaoManutencao;
    this.orientacaoCliente = man?.orientacao ?? man?.instructions ?? this.orientacaoCliente;

    this.cdr.markForCheck();
  });
}