import { User } from "@/domain/entities/user";

export interface IRegisterUser {
  create: (name: string, email: string, password: string) => Promise<User>
}