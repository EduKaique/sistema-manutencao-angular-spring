import { User } from './user';

export enum Role {
  TecnicoEmEletronica = 'Técnico em Eletrônica',
  TecnicoEmInformatica = 'Técnico em Informática',
  Instalador = 'Instalador',
  AuxiliarTecnico = 'Auxiliar Técnico',
}

export interface Employee extends User {
  employeeId: number
  role: Role;
  salary: number;
  birthDate: Date;
}
