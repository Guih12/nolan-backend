import { User } from "@/domain/entities";

export interface ISignUp {
  execute(name: string, email: string, password: string): Promise<User>
}