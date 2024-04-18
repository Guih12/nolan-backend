import { Base } from "./base"

export class Vaccine extends Base{
  private name: string
  
  constructor(id: string, name: string){
    super(id)
    this.name = name
  }

  getId(): string {
    return this.id
  }

  getName(): string {
    return this.name
  }
}