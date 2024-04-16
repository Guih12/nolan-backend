import { Animal } from "./animal"

export class VaccineCard {
  private id: string
  private animal: Animal
  private vaccine: any
  private appliedDate: Date
  private applied: boolean = false

  constructor(id: string, animal: Animal, vaccine: any, appliedDate: Date){
    this.id = id
    this.animal = animal
    this.vaccine = vaccine
    this.appliedDate = appliedDate
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