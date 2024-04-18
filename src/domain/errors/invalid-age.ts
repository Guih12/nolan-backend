export class InvalidAge extends Error {
  constructor() {
    super('Age is invalid')
    this.name = 'InvalidIsAge'
  }
}