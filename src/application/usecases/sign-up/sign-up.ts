import { PasswordLengthInvalid, UserExist } from "@/domain/exceptions"
import { User } from "@/domain/entities"
import { Encrypter } from "@/adapters/libs/encrypter"
import { ISignUp } from "@/domain/usecases"
import { ISignUpRepository } from "@/domain/repositories"
import { v4 as uuidv4 } from "uuid"

export class SignUp implements ISignUp {
  private PASSWORD_LENGTH = 6

  constructor(private readonly signUpRepository: ISignUpRepository , private readonly encrypter: Encrypter) {}

  async execute(name: string, email: string, password: string): Promise<User> {
    await this.userExists(email)
    const user: User = new User(await this.generateId(), name, email, password)
    user.encryptPassword(this.encrypter)
    await this.signUpRepository.create(user.getName(), user.getEmail(), user.getPassword())
    return user
  }

  private async userExists(email: string): Promise<void | UserExist> {
    if(await this.signUpRepository.findByEmail(email)) throw new UserExist()
  }

  private async generateId(): Promise<string> {
    return uuidv4()
  }
}