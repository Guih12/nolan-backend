import { PasswordLengthInvalid, UserExist } from "@/domain/errors"
import { User } from "@/domain/entities"
import { Encrypter } from "@/adapters/libs/encrypter"
import { ISignUp } from "@/domain/usecases"
import { ISignUpRepository } from "@/data/repositories"

export class SignUp implements ISignUp {
  private PASSWORD_LENGTH = 6

  constructor(private readonly signUpRepository: ISignUpRepository , private readonly encrypter: Encrypter) {}

  async execute(name: string, email: string, password: string): Promise<User> {
    await this.userExists(email)
    this.validatePassword(password)
    const user: User = new User(name, email, await this.encryptPassword(password))
    await this.signUpRepository.create(user.getName(), user.getEmail(), user.getPassword())
    return user
  }

  private async userExists(email: string): Promise<void | UserExist> {
    if(await this.signUpRepository.findByEmail(email)) throw new UserExist()
  }

  private validatePassword(password: string): PasswordLengthInvalid | void {
    if(password.length < this.PASSWORD_LENGTH) throw new PasswordLengthInvalid()
  }

  private async encryptPassword(password: string): Promise<string> {
    return this.encrypter.encrypt(password)
  }
}