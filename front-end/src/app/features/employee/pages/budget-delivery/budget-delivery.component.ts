import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
import { RequestService } from '../../../../core/services/request.service';
import { Request } from '../../../../shared/models/request';

@Component({
  selector: 'app-budget-delivery',
  templateUrl: './budget-delivery.component.html',
  styleUrls: ['./budget-delivery.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
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

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private requestService: RequestService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.currentRequestId = Number(id);
      this.request = this.requestService.buscarPorId(Number(id));
    }
  }

  onVoltarPaginaInicial() {
    this.router.navigate(['/employee/dashboard']);
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

  selectedTab = 0;
  temOrcamento = false;
  valorOrcamento = 520.0;
  servicosInclusos =
    'Diagnóstico técnico, Substituição do cabo flat da tela, Mão de obra, Limpeza interna + pasta térmica';

  temManutencao = false;
  descricaoManutencao =
    'Identifiquei que o problema estava em um dos módulos de memória RAM, que impedia a exibição de vídeo. Após substituir o módulo com defeito, o equipamento voltou a funcionar normalmente.';
  orientacaoCliente = 'N/A';
}
