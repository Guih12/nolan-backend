export class PasswordLengthInvalid extends Error {
  constructor() {
    super("Password length is invalid");
    this.name = "PasswordLengthInvalid";
  }
}