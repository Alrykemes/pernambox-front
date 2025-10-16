import type { User } from "@/types/user";

export interface Unit {
  id: string;
  name: string;
  address: string;
  users: User[];
}
