export type Role = "ADMIN_MASTER" | "ADMIN" | "USER";

export interface User {
  userId: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  active: boolean;
  role: Role;
  avatar?: string;
}

export interface Address {
  id: string;
  number: string;
  street: string;
  district: string;
  city: string;
  state: string;
  zipCode: string;
  complement?: string;
}

export interface Unit {
  id: string;
  name: string;
  phone: string;
  email: string;
  active: boolean;
  responsible: User;
  address: Address;
}
