import { User } from './user';
import { Address } from './address';

export interface Client extends User {
  address: Address;
}
