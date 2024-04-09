import { IRegisterUserRepository } from "@/adapters/repository/auth/register-user-repository"
import { IRegisterUser } from "./contracts/register-user-contract"
import { PasswordLengthInvalid, UserExist } from "../../errors"
import { User } from "../../entities/user"
import { Encrypter } from "@/adapters/libs/encrypter"

export class RegisterUser implements IRegisterUser {
  private PASSWORD_LENGTH = 6

  constructor(private readonly registerUserRepository: IRegisterUserRepository, private readonly encrypter: Encrypter) {}

  async create(name: string, email: string, password: string): Promise<User> {
    await this.userExists(email)
    this.validatePassword(password)
    const user: User = new User(name, email, await this.encryptPassword(password))
    await this.registerUserRepository.create(user.getName(), user.getEmail(), user.getPassword())
    return user
  }

  private async userExists(email: string): Promise<void | UserExist> {
    if(await this.registerUserRepository.findByEmail(email)) throw new UserExist()
  }

  private validatePassword(password: string): PasswordLengthInvalid | void {
    if(password.length < this.PASSWORD_LENGTH) throw new PasswordLengthInvalid()
  }

  private async encryptPassword(password: string): Promise<string> {
    return this.encrypter.encrypt(password)
  }
}