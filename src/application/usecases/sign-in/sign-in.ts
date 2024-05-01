import { ISignInRepository } from "@/domain/repositories"
import { User } from "@/domain/entities"
import { EmailOrPasswordWrong } from "@/domain/exceptions/email-or-password-wrong"
import { SignInInput } from "./sign-in-input"

export class SignIn {
  constructor(private readonly signInRepository: ISignInRepository) {}

  async execute({email, password}: SignInInput): Promise<User> {
    const currentUser = await this.signInRepository.findByEmail(email)
    if(!currentUser) throw new EmailOrPasswordWrong()
    if(currentUser.password !== password) throw new EmailOrPasswordWrong()
    return new User(currentUser.id, currentUser.name, currentUser.email, currentUser.password)
  }
}
