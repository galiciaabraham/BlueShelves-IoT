// src/types/user.ts
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  created_at: Date;
  updated_at: Date;
}
