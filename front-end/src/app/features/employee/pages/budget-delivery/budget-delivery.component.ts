import { ChangeDetectionStrategy, Component, TemplateRef, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

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

import { Status } from '../../../../shared/models/status';
import { StatusService } from '../../../../core/services/status.service';
import { MaintenanceRequestService } from '../../../../core/services/maintenance-request.service';
import { EmployeeRequestDetailDTO} from '../../../../shared/models/maintenance-request.models';
import { MaintenanceRecordDTO } from '../../../../shared/models/maintenance-record.model';
import { Employee } from '../../../../shared/models/employee';
import { EmployeService } from '../../services/employe.service';
import { ServiceItemDTO } from '../../../../shared/models/service-item.model';

import { BudgetCreateDTO } from '../../../../shared/models/budget.model';
import { ToastService } from '../../../../core/services/toast.service';
import { serviceItemService } from '../../../../core/services/service-item.service';

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

  constructor(
    private router: Router, 
    private dialog: MatDialog, 
    private cdr: ChangeDetectorRef,
    private statusService: StatusService, 
    private maintenanceRequestService: MaintenanceRequestService,
    private employeeService: EmployeService,
    private serviceItemService: serviceItemService,
    private route: ActivatedRoute, 
    private toast: ToastService,
  ) { }

  statuses: Status[] = [];
  request!: EmployeeRequestDetailDTO;
  isLoading = true;

  funcionariosDisponiveis: Employee[] = [];
  servicosDisponiveis: ServiceItemDTO[] = [];

  responsavel: Employee | null = null;
  dataAtribuicao: string = '';
  selectedFuncionario: Employee | null | undefined = undefined;
  dialogRef: any;

  selectedTab = 0;

  temOrcamento = false;
  valorOrcamento = 0;
  servicosInclusos = '';

  temManutencao = false;
  descricaoManutencao = '';
  orientacaoCliente = 'N/A';

  servicosSelecionados: ServiceItemDTO[] = [];
  valorTotal = 0;
  dialogOrcamentoRef: any;

  manutencaoDescricaoInput = '';
  manutencaoOrientacaoInput = '';
  manutencaoDialogRef: any;

  finalizacaoDialogRef: any;
  dataFinalizacao = '';

  ngOnInit(): void {
    this.statusService.getAll().subscribe(statuses => {
      this.statuses = statuses;
      this.cdr.markForCheck();
    });

    this.employeeService.getEmployees().subscribe(emps => {
      this.funcionariosDisponiveis = emps;
      this.cdr.markForCheck();
    });

    this.serviceItemService.getAllServices().subscribe(servs => {
      this.servicosDisponiveis = servs;
      this.cdr.markForCheck();
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadRequestDetails(Number(id));
    }
  }

  loadRequestDetails(id: number): void {
    // isLoading não é setado como true aqui para evitar "flicker" (piscar) na tela
    // se quisermos apenas atualizar os dados silenciosamente.
    this.maintenanceRequestService.getRequestByIdForEmployee(id).subscribe({
      next: (data) => {
        this.request = data;
        this.isLoading = false;

        if (this.request.assignedEmployeeName) {
           this.responsavel = { name: this.request.assignedEmployeeName } as Employee; 
        }

        if (this.request.budgets && this.request.budgets.length > 0) {
          this.temOrcamento = true;
          this.valorOrcamento = this.request.budgets.reduce((acc: number, b: any) => acc + (b.totalValue || 0), 0);
        }

        if (this.request.maintenanceRecord) {
          this.temManutencao = true;
          this.descricaoManutencao = this.request.maintenanceRecord.maintenanceDescription;
          this.orientacaoCliente = this.request.maintenanceRecord.clientGuidelines;
        }

        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error loading request details:', err);
        this.toast.error('Erro', 'Falha ao carregar detalhes da solicitação!');
        this.isLoading = false;
        this.cdr.markForCheck();
      },
    });
  }

  onVoltarPaginaInicial() {
    this.router.navigate(['/employee/dashboard']);
  }

  abrirDialog(template: TemplateRef<any>) {
    this.selectedFuncionario = this.responsavel ?? undefined;
    this.dialogRef = this.dialog.open(template, {
      disableClose: true,
      panelClass: 'custom-dialog'
    });
  }

  atribuirResponsavel() {
    if (!this.selectedFuncionario || !this.request) return;

    const funcionarioId = this.selectedFuncionario.id; 

    this.maintenanceRequestService.redirectMaintenance(this.request.id, funcionarioId)
      .subscribe({
        next: () => {
          this.toast.success('Sucesso', 'Responsável atribuído com sucesso!');
          this.loadRequestDetails(this.request.id);
          this.responsavel = this.selectedFuncionario || null;
          this.dataAtribuicao = new Date().toLocaleString('pt-BR'); 
          
          this.dialogRef.close();
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error(err);
          this.toast.error('Erro', 'Não foi possível atribuir o responsável.');
        }
      });
  }

  cancelarDialog() {
    this.dialogRef.close();
  }

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
      (acc, s) => acc + s.valor_servico,
      0
    );
    this.cdr.markForCheck();
  }

  confirmarOrcamento() {
    if (!this.request) return;

    const budgetPayload: BudgetCreateDTO = {
      serviceIds: this.servicosSelecionados.map(s => s.id),
      totalValue: this.valorTotal 
    };

    this.maintenanceRequestService.createBudget(this.request.id, budgetPayload)
      .subscribe({
        next: () => {
          this.toast.success('Sucesso', 'Orçamento registrado!');
          
          this.loadRequestDetails(this.request.id);
          this.temOrcamento = true;
          this.valorOrcamento = this.valorTotal;
          this.servicosInclusos = this.servicosSelecionados.map(s => s.nome).join(', ');
          
          this.fecharDialogOrcamento();
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error(err);
          this.toast.error('Erro', 'Falha ao registrar orçamento.');
        }
      });
  }

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
    if (!this.request) return;

    const maintenancePayload: MaintenanceRecordDTO = {
      id: this.request.maintenanceRecord ? this.request.maintenanceRecord.id : 0,
      maintenanceDescription: this.manutencaoDescricaoInput.trim(),
      clientGuidelines: this.manutencaoOrientacaoInput.trim()
    };

    this.maintenanceRequestService.executeMaintenance(this.request.id, maintenancePayload)
      .subscribe({
        next: () => {
          this.toast.success('Sucesso', 'Manutenção registrada!');
          
          this.loadRequestDetails(this.request.id);
          this.temManutencao = true;
          this.descricaoManutencao = maintenancePayload.maintenanceDescription;
          this.orientacaoCliente = maintenancePayload.clientGuidelines;
          
          this.fecharDialogManutencao();
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error(err);
          this.toast.error('Erro', 'Falha ao registrar manutenção.');
        }
      });
  }

  canFinalizarSolicitacao(): boolean {
    return this.request.status.nome === 'PAGA';
  }

  finalizarSolicitacao(template: TemplateRef<any>) {
    this.maintenanceRequestService.finalizeRequest(this.request.id)
      .subscribe({
        next: () => {
          this.toast.success('Sucesso', 'Solicitação finalizada com sucesso!');
          this.loadRequestDetails(this.request.id);
          this.cdr.markForCheck();
          this.dataFinalizacao = new Date().toLocaleString('pt-BR');
          this.finalizacaoDialogRef = this.dialog.open(template, {
            disableClose: false,
            panelClass: 'custom-dialog'
          });
        },
        error: (err) => {
          console.error(err);
          this.toast.error('Erro', 'Falha ao finalizar a solicitação.');
        }
      });
    
  }

}