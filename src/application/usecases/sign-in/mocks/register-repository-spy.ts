import { ISignInRepository } from "@/domain/repositories"

export class SignInRepositorySpy implements ISignInRepository {
  users = [
    {
      id: "some_id",
      email: "some_email",
      password: "some_password"
    }
  ]
  incrementCallsCount = 0
  async findByEmail(email: string) {
    this.incrementCallsCount++
    return this.users.find(user => user.email === email)
  }
}