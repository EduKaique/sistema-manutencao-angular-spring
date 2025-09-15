import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

type InputTypes = 'text' | 'email' | 'password' | 'number';

@Component({
  selector: 'app-input-primary',
  standalone: true,
  imports: [ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './input-primary.component.html',
  styleUrls: ['./input-primary.component.css'],
})
export class InputPrimaryComponent {
  @Input() label: string = '';
  @Input() formName!: string;
  @Input() type: InputTypes = 'text';
  @Input() placeholder: string = '';
  @Input() mask?: string;
}
