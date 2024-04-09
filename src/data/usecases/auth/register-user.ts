import { IRegisterUser } from "@/domain/usecases/auth/register-user"

interface IRegisterUserRepository {
  create: (name: string, email: string, password: string) => Promise<void>
  findByEamil(email: string): Promise<any>
}

export class RegisterUser implements IRegisterUser{
  constructor(private readonly registerUserRepository: IRegisterUserRepository) {}

  async create(name: string, email: string, password: string): Promise<void> {
    const userExists = await this.registerUserRepository.findByEamil(email)

    if(userExists) throw new Error("User alread exists")
    if(password.length < 6) throw new Error("Password length is invalid")

    await this.registerUserRepository.create(name, email, password)
  }
}