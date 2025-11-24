import { ChangeDetectionStrategy, Component, TemplateRef, inject, OnInit } from '@angular/core';
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


// Tipos do seu projeto (ajuste os paths se necessário)
import { Status } from '../../../../shared/models/status';
import { Request as RequestModel } from '../../../../shared/models/request';


// Services (ajuste os paths se necessário)
import { StatusService } from '../../../../core/services/status.service';
import { MaintenanceRequestService } from '../../../../core/services/maintenance-request.service';
import { MaintenanceRequestResponseDTO } from '../../../../shared/models/maintenance-request.models';


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
export class BudgetDeliveryComponent implements OnInit {
  // Router/Dialogs
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private cdr = inject(ChangeDetectorRef);


  // Services e rota
  private statusService = inject(StatusService);
  private maintenanceRequestService = inject(MaintenanceRequestService);
  private route = inject(ActivatedRoute);


  // Dados vindos dos services (padrão do dashboard: arrays)
  statuses: Status[] = [];
  requests: MaintenanceRequestResponseDTO[] = [];


  // Lifecycle
  ngOnInit(): void {
  this.statusService.getAll().subscribe(statuses => {
    this.statuses = statuses;
  });

  this.maintenanceRequestService.getAllEmployeeRequests().subscribe(requests => {
    this.requests = requests;
  });

  this.route.paramMap.subscribe(pm => {
    const id = pm.get('id') ?? pm.get('requestId');
    if (id && this.requests) {
      const req = this.requests.find(r => String(r.id) === String(id));
      if (req) {
        this.preencherTelaComRequest(req);
      }
    }
  });
}


  // Navegação topo
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


  // Detalhes (preenchidos automaticamente)
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


  // Preenche a tela com dados da Request (mesmo mapeamento que te passei)
  private preencherTelaComRequest(req: any) {
    // Status label
    const st = this.statuses.find(s => s.id === (req as any).statusId);
    const statusLabel = (st as any)?.nome ?? (st as any)?.name ?? this.detalhes.status;


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
  }
}