export interface IVaccineRepository {
  getVaccineByName(name: string): Promise<any>
}
