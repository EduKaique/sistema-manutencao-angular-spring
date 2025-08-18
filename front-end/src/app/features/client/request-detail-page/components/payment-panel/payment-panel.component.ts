import {ChangeDetectionStrategy, Component, viewChild} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

/**
 * @title Accordion with expand/collapse all toggles
 */
@Component({
  selector: 'app-payment-panel',
  templateUrl: './payment-panel.component.html',
  styleUrls: ['./payment-panel.component.css'],
  providers: [provideNativeDateAdapter()],
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentPanelComponent {
  accordion = viewChild.required(MatAccordion);
}