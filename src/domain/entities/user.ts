import { v4 as uuidv4 } from "uuid";

export class User {
  private readonly id?: string;
  private name: string;
  private email: string;
  private password: string;

  constructor(name: string, email: string, password: string, id?: string) {
    this.id = id || uuidv4();
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
}