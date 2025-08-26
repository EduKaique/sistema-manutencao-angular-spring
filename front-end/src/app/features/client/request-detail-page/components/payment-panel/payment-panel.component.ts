import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-payment-panel',
  templateUrl: './payment-panel.component.html',
  styleUrls: ['./payment-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentPanelComponent {
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
}
