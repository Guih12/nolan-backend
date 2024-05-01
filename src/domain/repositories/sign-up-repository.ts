export interface ISignUpRepository {
  create: (name: string, email: string, password: string) => Promise<boolean>
  findByEmail(email: string): Promise<any>
}