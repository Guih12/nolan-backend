import { invalidWeight } from "../exceptions/invalid-weight"
import { Base } from "./base"

export class Weight extends Base {
  private value: number
  private date: Date

  constructor(id: string, value: number, date: Date) {
    if(value < 0) throw new invalidWeight()

    super(id)
    this.value = value
    this.date = date
  }

  public getId(): string {
    return this.id
  }

  public getValue(): number {
    return this.value
  }

  public getDate(): Date {
    return this.date
  }
}
