export interface IRegisterUserRepository {
  create: (name: string, email: string, password: string) => Promise<void>
  findByEmail(email: string): Promise<any>
}