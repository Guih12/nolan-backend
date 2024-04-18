import { Base } from "./base"
import { Weight } from "./weigth"

export class Animal extends Base {
  private name: string
  private age: number
  private type: string
  private sex: string
  private breed: string
  private weights: Weight[] = []

  constructor(id: string, name: string, age: number, type: string, sex: string, breed: string) {
    if(age < 0) throw new Error("Age is invalid")
    super(id)
    this.name = name
    this.age = age
    this.type = type
    this.sex = sex
    this.breed = breed
  }

  public getId(): string {
    return this.id
  }

  public getName(): string {
    return this.name
  }

  public getAge(): number {
    return this.age
  }

  public getType(): string {
    return this.type
  }

  public getSex(): string {
    return this.sex
  }

  public getBreed(): string {
    return this.breed
  }

  public addWeight(weight: Weight): void {
    this.weights.push(weight)
  }

  public getWeights(): number[] {
    return this.weights.map(weight => weight.getValue())
  }
}