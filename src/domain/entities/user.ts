import { PasswordLengthInvalid } from "../errors";
import { Encrypter } from "@/adapters/libs/encrypter";

export class User {
  private id: string;
  private name: string;
  private email: string;
  private password: string;

  constructor(id: string, name: string, email: string, password: string) {
    if(password.length < 6) throw new PasswordLengthInvalid()

    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  getId(): string | undefined{
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  async encryptPassword(encrypter: Encrypter): Promise<void> {
    this.password = await encrypter.encrypt(this.password);
  }
}