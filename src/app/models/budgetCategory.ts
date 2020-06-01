import { Injectable } from '@angular/core';

@Injectable()
export class BudgetCategory {
  constructor(
    public id_orcamento: number,
    public id_categoria: number,
    public valor: number
  ) {
  }
}
