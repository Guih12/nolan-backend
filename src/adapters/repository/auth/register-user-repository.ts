export interface IRegisterUserRepository {
  create: (name: string, email: string, password: string) => Promise<boolean>
  findByEmail(email: string): Promise<any>
}