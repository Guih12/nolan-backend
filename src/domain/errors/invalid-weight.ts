export class invalidWeight extends Error {
  constructor() {
    super("Weight is invalid")
    this.name = "invalidWeight"
  }
}