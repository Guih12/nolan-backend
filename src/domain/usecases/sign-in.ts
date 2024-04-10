import { User } from "../entities";

export interface ISignIn {
  execute(email: string, password: string): Promise<User>
}