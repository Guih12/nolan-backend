import { ISignInRepository } from "@/data/repositories"
import { User } from "@/domain/entities"
import { ISignIn } from "@/domain/usecases/sign-in"

export class SignIn implements ISignIn {
  constructor(private readonly signInRepository: ISignInRepository) {}

  async execute(email: string, password: string): Promise<User> {
    const currentUser = await this.signInRepository.findByEmail(email)
    if(!currentUser) throw new Error("User not exists")
    if(currentUser.password !== password) throw new Error("User not exists")
    return new User(currentUser.id, currentUser.email, currentUser.password)
  }
}
