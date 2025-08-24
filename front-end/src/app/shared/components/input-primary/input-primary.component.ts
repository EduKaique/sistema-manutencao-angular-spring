import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

type InputTypes = "text" | "email" | "password" | "number"

@Component({
  selector: 'app-input-primary',
  imports: [ReactiveFormsModule],
  templateUrl: './input-primary.component.html',
  styleUrl: './input-primary.component.css'
})
export class InputPrimaryComponent {
  @Input() label: string = "";
  @Input() type: InputTypes = "text";
  @Input() formName!: string;
  @Input() placeholder: string = "";
}
