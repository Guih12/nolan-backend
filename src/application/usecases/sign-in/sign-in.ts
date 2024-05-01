import { ISignInRepository } from "@/domain/repositories"
import { User } from "@/domain/entities"
import { EmailOrPasswordWrong } from "@/domain/exceptions/email-or-password-wrong"
import { ISignIn } from "@/domain/usecases/sign-in"

export class SignIn implements ISignIn {
  constructor(private readonly signInRepository: ISignInRepository) {}

  async execute(email: string, password: string): Promise<User> {
    const currentUser = await this.signInRepository.findByEmail(email)
    if(!currentUser) throw new EmailOrPasswordWrong()
    if(currentUser.password !== password) throw new EmailOrPasswordWrong()
    return new User(currentUser.id, currentUser.name, currentUser.email, currentUser.password)
  }
}
