import { Group } from './group';

export class Budget {
  constructor(
    public id_contexto: number,
    public id_orcamento: number,
    public data: Date,
    public nota: string,
    public agrupamentos: Group[]
  ) {
  }
}
