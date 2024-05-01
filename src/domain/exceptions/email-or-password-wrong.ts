export class EmailOrPasswordWrong extends Error {
  constructor() {
    super("Email or password is wrong")
    this.name = "EmailOrPasswordIsWrong"
  }
}