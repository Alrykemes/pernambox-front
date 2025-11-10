import type { Address } from "@/types/address";
import type { User } from "@/types/user";

export interface Unit {
  id: string;
  name: string;
  phone: string;
  email: string;
  active: boolean;
  responsible: User;
  address: Address;
}
