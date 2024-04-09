import { IRegisterUserRepository } from "@/adapters/repository/auth/register-user-repository"

export class RegisterUserRepositorySpy implements IRegisterUserRepository {
  users = [
    {
      name: "some_name",
      email: "some_email",
      password: "some_password"
    }
  ]

  incrementCallsCount = 0
  incrementCallsFindByEmailCount = 0

  async create(name: string, email: string, password: string): Promise<void> {
    this.incrementCallsCount++
    await this.users.push({ name, email, password })
    return 
  }

  async findByEmail(email: string) {
    this.incrementCallsFindByEmailCount++
    return this.users.find(user => user.email === email)
  }
}