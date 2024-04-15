export class Weight {
  private id: string
  private value: number

  constructor(id: string, value: number) {
    if(value < 0) throw new Error("Weight is invalid")

    this.id = id
    this.value = value
  }

  public getId(): string {
    return this.id
  }

  public getValue(): number {
    return this.value
  }
}
