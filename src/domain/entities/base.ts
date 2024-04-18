export abstract class Base {
  protected id: string
  
  constructor(id: string){
    this.id = id
  }

  getId(): string {
    return this.id
  }
}