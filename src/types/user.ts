import type { Unit } from "@/types/unit";

export interface User {
  id: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  role: string;
  unit: Unit;
  avatar?: string;
}
