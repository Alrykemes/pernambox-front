export type Role = "ADMIN_MASTER" | "ADMIN" | "USER";
export type TypeLog = "CREATE" | "UPDATE" | "DELETE";
export type Target = "UNIT" | "USER" | "PRODUCT" | "RESOURCE" | "RESOURCE_PRODUCT" | "ORIGIN" | "DESTINATION";

export interface User {
  userId: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  active: boolean;
  role: Role;
  imageProfileName?: string;
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

export interface LogHistory {
  id: number;
  description: string;
  logHistoryType: TypeLog;
  logHistoryTarget: Target;
  dateTime: string;
  targetId: string;
  unitId: string;
  responsibleUser: User;
}
