export interface RegisterRequest {
  cpf: string;
  name: string;
  email: string;
  phoneNumber: string;
  zipCode: string;
  street: string;
  number: string;
  complement?: string; 
  neighborhood: string;
  city: string;
  state: string;
}