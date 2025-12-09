// src/api/mockUser.ts
import { User } from '@/types/user';

export const mockUser: User = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  password: "hashed_password",
  role: "user",
  created_at: new Date("2024-01-01T12:00:00Z"),
  updated_at: new Date("2025-01-01T12:00:00Z")
};
