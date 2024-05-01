import { ISignUpRepository } from "@/domain/repositories"

export class SignUpRepositotySpy implements ISignUpRepository {
  users = [
    {
      name: "some_name",
      email: "some_email",
      password: "some_password"
    }
  ]

  incrementCallsCount = 0
  incrementCallsFindByEmailCount = 0

  async create(name: string, email: string, password: string): Promise<boolean> {
    this.incrementCallsCount++
    await this.users.push({ name, email, password })
    return true
  }

  async findByEmail(email: string) {
    this.incrementCallsFindByEmailCount++
    return this.users.find(user => user.email === email)
  }
}