import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Pagamento {
  titulo: string;
  preco: number;
}

@Component({
  selector: 'app-payment-panel',
  templateUrl: './payment-panel.component.html',
  imports: [CommonModule],
  styleUrls: ['./payment-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentPanelComponent {
  backLink = '← Voltar para Página Inicial';
  item = 'Notebook Dell Inspiron 15';
  categoria = 'Notebook';
  defeito = `O equipamento liga, mas a tela permanece preta (sem imagem). 
  O LED indicador de energia acende e é possível ouvir o som da ventoinha 
  em funcionamento, mas não há qualquer sinal de vídeo. 
  O problema persiste mesmo após reiniciar o dispositivo várias vezes.`;

  pagamentos: Pagamento[] = [
    { titulo: 'Diagnóstico técnico', preco: 100 },
    { titulo: 'Substituição do cabo flat da tela', preco: 180 },
    { titulo: 'Mão de obra', preco: 150 },
    { titulo: 'Limpeza interna + pasta térmica', preco: 90 },
  ];

  selectedMethod: 'cartao' | 'pix' | null = null;

  selectMethod(method: 'cartao' | 'pix') {
    this.selectedMethod = method;
    console.log('Método selecionado:', method);
  }

  payNow() {
    if (!this.selectedMethod) {
      alert('Selecione uma forma de pagamento antes de continuar.');
      return;
    }

    if (this.selectedMethod === 'cartao') {
      alert('Pagamento via Cartão realizado!');
    } else if (this.selectedMethod === 'pix') {
      alert('Pagamento via PIX realizado!');
    }
  }
get total() {
  let soma = 0;
  for (let p of this.pagamentos) {
    soma = soma + p.preco;
  }
  return soma;
}


}
