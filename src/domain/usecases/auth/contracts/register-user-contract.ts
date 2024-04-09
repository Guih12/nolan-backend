export interface IRegisterUser {
  create: (name: string, email: string, password: string) => Promise<void>
}