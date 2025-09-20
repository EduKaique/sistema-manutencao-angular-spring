import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

function validarCPF(cpf: string): boolean {
    let soma : number = 0;  
    let resto : number;
    let digitoVerificador1 : number;
    let digitoVerificador2 : number;

    cpf = cpf.replaceAll(".", "").replace("-", "");

    if(cpf.length !== 11) {
        return false;
    }

    //Calculo dos dígito verificador 1
    soma = 0;
    for(let i :number = 0; i< 9; i++) {
        const num : number = parseInt(cpf[i]);
        const peso : number = 10 - i;
        soma += num * peso;
    }

    resto = soma % 11;
    digitoVerificador1 = resto < 2 ? 0 : 11 - resto;

    //Calculo dos dígito verificador 2
    soma = 0;
    for(let i :number = 0; i< 10; i++) {
        const num : number = parseInt(cpf[i]);
        const peso : number = 11 - i;
        soma += num * peso;
    }

    resto = soma % 11;
    digitoVerificador2 = resto < 2 ? 0 : 11 - resto;

    //Comparação com os dígitos originais
    if(cpf.charAt(9) !== digitoVerificador1.toString() || cpf.charAt(10) !== digitoVerificador2.toString()) {
        return false;
    }

return true;
}

export class CustomValidators {
  static useExistingCpfValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      
      const ehValido = validarCPF(control.value);
      return ehValido ? null : { cpfInvalido: true };
    };
  }
}