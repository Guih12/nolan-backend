export class UserExist extends Error {
  constructor() {
    super("User alread exists")
    this.name = "userExists"
  }
}