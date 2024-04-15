export type CreateAnimalInput = {
  name: string
  age: number
  type: string
  sex: string
  breed: string
  weight: number
}

export interface ICreateAnimal {
  execute(input: CreateAnimalInput): Promise<any>
}