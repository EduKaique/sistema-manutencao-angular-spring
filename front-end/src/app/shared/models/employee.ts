import { User } from './user';

export enum Role {
  TecnicoEmEletronica = 'Técnico em Eletrônica',
  TecnicoEmInformatica = 'Técnico em Informática',
  Instalador = 'Instalador',
  AuxiliarTecnico = 'Auxiliar Técnico',
}

export interface Employee {
    id: number;
    name: string;
    email: string;
    cpf: string | null;
    phone: string | null;
    birthDate: string;
    wage: number | null;
    password : string;
    active: boolean;
}
