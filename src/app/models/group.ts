import { Category } from './category';
import { Injectable } from '@angular/core';

@Injectable()
export class Group {
  constructor(
    public id_agrupamento: number,
    public id_orcamento: number,
    public nome: string,
    public categorias: Category[]
  ) {
  }
}
