import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputPrimaryComponent } from '../../../../shared/components/input-primary/input-primary.component'

@Component({
  selector: 'app-signup-page',
  imports: [InputPrimaryComponent,ReactiveFormsModule],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})
export class SignupPageComponent {
  form = new FormGroup({
    nameUser: new FormControl(''),
    cpfUser: new FormControl(''),
    phoneUser: new FormControl(''),
    email: new FormControl('')
  });
}


