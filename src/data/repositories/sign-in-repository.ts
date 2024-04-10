export interface ISignInRepository {
  findByEmail(email: string): Promise<any>
}