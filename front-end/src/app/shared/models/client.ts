import { User } from './user';
import { Address } from './address';

export interface Client extends User {
    id: number;
    endereco: Address;
}
