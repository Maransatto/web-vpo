import { Category } from './category';

export class Group {
  constructor(
    public id_agrupamento: number,
    public id_orcamento: number,
    public nome: string,
    public categorias: Category[]
  ) {
  }
}
