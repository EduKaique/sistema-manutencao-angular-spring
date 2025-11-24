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
import { Status } from '../../../../shared/models/status';
import { Request as RequestModel } from '../../../../shared/models/request';
import { RequestData } from '../../../../shared/models/request-data';
import { StatusService } from '../../../../core/services/status.service';
import { RequestService } from '../../../../core/services/request.service';
import { ServiceItemService, ServiceItem } from '../../../../core/services/service-item.service';
import { BudgetService } from '../../../../core/services/budget.service';
import { MaintenanceRequestService, MaintenanceRecordPayload } from '../../../../core/services/maintenance-request.service';
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
private router = inject(Router);
private dialog = inject(MatDialog);
private cdr = inject(ChangeDetectorRef);
private route = inject(ActivatedRoute);
private statusService = inject(StatusService);
private requestService = inject(RequestService);
private serviceItemService = inject(ServiceItemService);
private budgetService = inject(BudgetService);
private maintenanceRequestService = inject(MaintenanceRequestService);
// dados base
statuses: Status[] = [];
requests: RequestModel[] = [];
requestId!: number;
requestDetail!: RequestData;
detalhes = {
id: '',
data: new Date(),
status: '',
item: '',
categoria: '',
autor: '',
defeito: ''
};
// Responsável
responsavel: any = null;
dataAtribuicao = '';
funcionarios = [
{ id: 1, nome: 'Carlos Mendel', cargo: 'Técnico em Informática' },
{ id: 2, nome: 'Maria Souza', cargo: 'Técnica em Redes' },
{ id: 3, nome: 'João Silva', cargo: 'Técnico em Suporte' }
];
selectedFuncionario: any = null;
dialogRef: any;
// Aba
selectedTab = 0;
// Orçamento (usando RequestData.valor e RequestData.servicos)
temOrcamento = false;
valorOrcamento = 0;
servicosInclusos = '';
servicosDisponiveis: ServiceItem[] = [];
servicosSelecionados: ServiceItem[] = [];
valorTotal = 0;
dialogOrcamentoRef: any;
// Manutenção
temManutencao = false;
descricaoManutencao = '';
orientacaoCliente = '';
manutencaoDescricaoInput = '';
manutencaoOrientacaoInput = '';
manutencaoDialogRef: any;
// Finalização
finalizacaoDialogRef: any;
dataFinalizacao = '';
ngOnInit(): void {
// carrega status e requests como no dashboard
this.statuses = this.statusService.getAll();
this.requests = this.requestService.listarTodos();
// id da rota
this.route.paramMap.subscribe(pm => {
const id = pm.get('id') ?? pm.get('requestId');
if (id) {
this.requestId = Number(id);
const req = this.requests.find(r => r.id === this.requestId);
if (req) {
this.preencherTelaComRequest(req);
}
this.carregarDetalheDaSolicitacao();
}
});


// serviços disponíveis (back)
this.serviceItemService.getAll().subscribe({
next: (services: ServiceItem[]) => {
this.servicosDisponiveis = services;
this.cdr.markForCheck();
},
error: (err: unknown) => {
console.error('Erro ao carregar serviços', err as any);
}
});
}
private carregarDetalheDaSolicitacao() {
if (!this.requestId) {
return;
}
this.maintenanceRequestService.getRequestDetailForEmployee(this.requestId).subscribe({
next: (detail: RequestData) => {
this.requestDetail = detail;
// mapeia orçamento
if (detail.valor && detail.valor > 0) {
this.temOrcamento = true;
this.valorOrcamento = detail.valor;
this.servicosInclusos = detail.servicos ?? '';
} else {
this.temOrcamento = false;
this.valorOrcamento = 0;
this.servicosInclusos = '';
}


// se o DTO tiver campos de manutenção, mapeia aqui
const anyDetail: any = detail as any;
if (anyDetail.manutencaoDescricao || anyDetail.descManutencao) {
this.temManutencao = true;
this.descricaoManutencao = anyDetail.manutencaoDescricao ?? anyDetail.descManutencao ?? '';
this.orientacaoCliente = anyDetail.orientacaoCliente ?? anyDetail.manutencaoOrientacao ?? '';
}


this.cdr.markForCheck();
},
error: (err: unknown) => {
console.error('Erro ao carregar detalhe da solicitação', err as any);
}
});
}
// Voltar
onVoltarPaginaInicial() {
this.router.navigate(['/employee/dashboard']);
}
// Preenche tela com Request (modelo que seu PO já usa)
private preencherTelaComRequest(req: RequestModel) {
const st = this.statuses.find(s => s.id === req.statusId);
const statusLabel = st?.nome ?? req.status ?? 'ABERTA';
this.detalhes = {
id: String(req.id),
data: new Date(req.requestDate),
status: statusLabel,
item: req.equipmentName,
categoria: String(req.categoryId),
autor: String(req.clientId), // se tiver nome de client em outro lugar, troque aqui
defeito: req.equipmentDescription
};


// se tiver employee / responsavel no DTO, preenche aqui (mock por enquanto)
this.responsavel = null;
this.dataAtribuicao = '';
this.cdr.markForCheck();
}
// Dialog Responsável
abrirDialog(template: TemplateRef<any>) {
this.selectedFuncionario = this.responsavel ?? undefined;
this.dialogRef = this.dialog.open(template, {
disableClose: true,
panelClass: 'custom-dialog'
});
}
atribuirResponsavel() {
this.responsavel = this.selectedFuncionario || null;
if (this.responsavel) {
this.dataAtribuicao = new Date().toLocaleString('pt-BR', {
day: '2-digit', month: '2-digit', year: 'numeric',
hour: '2-digit', minute: '2-digit', second: '2-digit'
});
this.maintenanceRequestService
.redirectMaintenance(this.requestId, this.responsavel.id)
.subscribe({
next: () => {
this.dialogRef.close();
this.cdr.markForCheck();
},
error: (err: unknown) => {
console.error('Erro ao atribuir responsável', err as any);
this.dialogRef.close();
}
});
} else {
this.dialogRef.close();
}
}
cancelarDialog() {
this.dialogRef.close();
}
// Dialog Orçamento
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
(acc, s) => acc + (s.valorServico ?? 0),
0
);
this.cdr.markForCheck();
}
confirmarOrcamento() {
if (!this.requestId || this.servicosSelecionados.length === 0) {
return;
}
const serviceIds = this.servicosSelecionados.map(s => s.id);


this.budgetService.createBudget(this.requestId, serviceIds).subscribe({
next: (res: any) => {
this.temOrcamento = true;
this.valorOrcamento = this.valorTotal;
this.servicosInclusos = this.servicosSelecionados
.map(s => s.nome)
.join(', ');


this.fecharDialogOrcamento();
this.cdr.markForCheck();
},
error: (err: unknown) => {
console.error('Erro ao efetuar orçamento', err as any);
}
});
}
// Dialog Manutenção
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
if (!this.requestId || !this.isManutencaoFormValid()) {
return;
}
const dto: MaintenanceRecordPayload = {
descManutencao: this.manutencaoDescricaoInput.trim(),
orientacaoCliente: this.manutencaoOrientacaoInput.trim()
};


this.maintenanceRequestService.executeMaintenance(this.requestId, dto).subscribe({
next: (res: any) => {
this.temManutencao = true;
this.descricaoManutencao = dto.descManutencao;
this.orientacaoCliente = dto.orientacaoCliente;


this.fecharDialogManutencao();
this.cdr.markForCheck();
},
error: (err: unknown) => {
console.error('Erro ao efetuar manutenção', err as any);
}
});
}
// Finalização
canFinalizarSolicitacao(): boolean {
return !!this.responsavel && this.temOrcamento && this.temManutencao;
}
abrirDialogFinalizacao(template: TemplateRef<any>) {
if (!this.requestId) {
return;
}
this.maintenanceRequestService.finalizeRequest(this.requestId).subscribe({
next: (res: any) => {
this.detalhes.status = res?.status ?? 'FINALIZADA';
this.dataFinalizacao = new Date().toLocaleString('pt-BR', {
day: '2-digit', month: '2-digit', year: 'numeric',
hour: '2-digit', minute: '2-digit', second: '2-digit'
});


this.finalizacaoDialogRef = this.dialog.open(template, {
disableClose: true,
panelClass: 'custom-dialog'
});


this.cdr.markForCheck();
},
error: (err: unknown) => {
console.error('Erro ao finalizar solicitação', err as any);
}
});
}
voltarPaginaInicialPosFinalizacao() {
if (this.finalizacaoDialogRef) {
this.finalizacaoDialogRef.close();
}
this.router.navigate(['/employee/dashboard']);
}
}