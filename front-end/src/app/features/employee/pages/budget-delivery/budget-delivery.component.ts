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
import { EmployeeRequestDetailDTO, MaintenanceRequestResponseDTO } from '../../../../shared/models/maintenance-request.models';
import { ToastService } from '../../../../core/services/toast.service';


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

  constructor(private router: Router, private dialog: MatDialog, private cdr: ChangeDetectorRef,
    private statusService: StatusService, private maintenanceRequestService: MaintenanceRequestService,
    private route: ActivatedRoute, private toast: ToastService,
  ) { }




  // Dados vindos dos services (padrão do dashboard: arrays)
  statuses: Status[] = [];
  request!: EmployeeRequestDetailDTO;
  isLoading = true;


  // Lifecycle
  ngOnInit(): void {
  this.statusService.getAll().subscribe(statuses => {
    this.statuses = statuses;
  });

  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.loadRequestDetails(Number(id));
    }
  }

  loadRequestDetails(id: number): void {
    this.maintenanceRequestService.getRequestByIdForEmployee(id).subscribe({
      next: (data) => {
        this.request = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading request details:', err);
        this.toast.error('Erro', 'Falha ao carregar detalhes da solicitação!');
        this.isLoading = false;
      },
    });
  }


  // Navegação topo
  onVoltarPaginaInicial() {
    this.router.navigate(['/employee/dashboard']);
  }


  // Responsável
  responsavel: any = null;
  dataAtribuicao: string = '';
  
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
    // this.detalhes.status = 'PAGA';
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
    this.router.navigate(['/employee/dashboard']);
  }
  
}