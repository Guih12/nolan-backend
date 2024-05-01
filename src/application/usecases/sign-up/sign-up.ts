import { UserExist } from "@/domain/exceptions"
import { User } from "@/domain/entities"
import { Encrypter } from "@/adapters/libs/encrypter"
import { ISignUpRepository } from "@/domain/repositories"
import { v4 as uuidv4 } from "uuid"
import { SignUpInput } from "./sign-up-input"

export class SignUp {  
  
  constructor(
    private readonly signUpRepository: ISignUpRepository , 
    private readonly encrypter: Encrypter
  ) {}

  async execute({name, email, password}: SignUpInput): Promise<User> {
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