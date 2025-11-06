export interface User {
  userId: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  active: boolean;
  role: string;
  avatar?: string;
}
