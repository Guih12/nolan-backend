export class User {
  private readonly id?: number;
  private readonly name: string;
  private readonly email: string;
  private readonly password: string;

  constructor(name: string, email: string, password: string, id?: number) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  getId(): number | undefined {
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