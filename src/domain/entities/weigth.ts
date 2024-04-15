import { invalidWeight } from "../errors/invalid-weight"

export class Weight {
  private id: string
  private value: number
  private date: Date

  constructor(id: string, value: number, date: Date) {
    if(value < 0) throw new invalidWeight()

    this.id = id
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
