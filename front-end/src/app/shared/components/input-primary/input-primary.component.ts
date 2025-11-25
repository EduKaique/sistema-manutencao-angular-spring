import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { NgIf, NgClass } from '@angular/common';

type InputTypes = 'text' | 'email' | 'password' | 'number';

@Component({
  selector: 'app-input-primary',
  imports: [ReactiveFormsModule, NgxMaskDirective, NgIf, NgClass],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputPrimaryComponent),
      multi: true
    }
  ],
  templateUrl: './input-primary.component.html',
  styleUrls: ['./input-primary.component.css'],
})
export class InputPrimaryComponent implements ControlValueAccessor {
  @Input() type: InputTypes = 'text';
  @Input() label: string = '';
  @Input() inputName: string = '';
  @Input() placeholder: string = '';
  @Input() mask?: string;

  @Input() hasError: boolean = false;
  @Input() errorMessage: string = '';

  value: string = ''
  onChange: any = () => {}
  onTouched: any = () => {}

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value
    this.onChange(value)
  }

  onBlur() {
    this.onTouched();
  }

  writeValue(value: any): void {
      this.value = value
  }

  registerOnChange(fn: any): void {
      this.onChange = fn
  }

  registerOnTouched(fn: any): void {
      this.onTouched = fn
  }


}
