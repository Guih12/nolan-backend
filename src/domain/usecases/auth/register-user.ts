import { IRegisterUserRepository } from "@/adapters/repository/auth/register-user-repository"
import {IRegisterUser } from "./contracts/register-user-contract"
import { PasswordLengthInvalid, UserExist } from "../../errors"

export class RegisterUser implements IRegisterUser {
  constructor(private readonly registerUserRepository: IRegisterUserRepository) {}

  async create(name: string, email: string, password: string): Promise<void> {
    const userExists = await this.registerUserRepository.findByEmail(email)

    if(userExists) throw new UserExist()
    if(password.length < 6) throw new PasswordLengthInvalid()

    await this.registerUserRepository.create(name, email, password)
  }
}