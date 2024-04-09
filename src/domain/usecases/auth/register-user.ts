import { IRegisterUserRepository } from "@/adapters/repository/auth/register-user-repository"
import {IRegisterUser } from "./contracts/register-user-contract"
import { PasswordLengthInvalid, UserExist } from "../../errors"

export class RegisterUser implements IRegisterUser {
  constructor(private readonly registerUserRepository: IRegisterUserRepository) {}

  async create(name: string, email: string, password: string): Promise<void> {
    await this.userExists(email)
    this.validatePassword(password)
    await this.registerUserRepository.create(name, email, password)
  }

  private async userExists(email: string): Promise<void | UserExist> {
    if(await this.registerUserRepository.findByEmail(email)) throw new UserExist()
  }

  private validatePassword(password: string): PasswordLengthInvalid | void {
    if(password.length < 6) throw new PasswordLengthInvalid()
  }
}