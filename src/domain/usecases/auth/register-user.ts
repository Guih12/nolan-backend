import { IRegisterUserRepository } from "@/adapters/repository/auth/register-user-repository"
import {IRegisterUser } from "./contracts/register-user-contract"
import { PasswordLengthInvalid, UserExist } from "../../errors"
import { User } from "../../entities/user"

export class RegisterUser implements IRegisterUser {
  constructor(private readonly registerUserRepository: IRegisterUserRepository) {}

  async create(name: string, email: string, password: string): Promise<Boolean> {
    await this.userExists(email)
    this.validatePassword(password)
    const user = new User(name, email, password)
    try{
      await this.registerUserRepository.create(user.getName(), user.getEmail(), user.getPassword())
      return true
    }catch(err){
      throw new Error("Error on create use")
    }
  }

  private async userExists(email: string): Promise<void | UserExist> {
    if(await this.registerUserRepository.findByEmail(email)) throw new UserExist()
  }

  private validatePassword(password: string): PasswordLengthInvalid | void {
    if(password.length < 6) throw new PasswordLengthInvalid()
  }
}