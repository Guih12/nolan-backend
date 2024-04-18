import { Animal } from "./animal"
import { Base } from "./base"

export class VaccineCard extends Base {
  private animal: Animal
  private vaccine: any
  private appliedDate: Date
  private applied: boolean

  constructor(id: string, animal: Animal, vaccine: any, appliedDate: Date, applied: boolean){
    super(id)
    this.animal = animal
    this.vaccine = vaccine
    this.appliedDate = appliedDate
    this.applied = applied
  }

  getId(): string {
    return this.id
  }

  getAnimal(): Animal {
    return this.animal
  }

  getVaccine(): any {
    return this.vaccine
  }

  getAppliedDate(): Date {
    return this.appliedDate
  }

  getApplied(): boolean {
    return this.applied
  }
}