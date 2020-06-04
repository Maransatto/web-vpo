import { Injectable } from '@angular/core';
import { Budget } from '../models/budget';
import { Store } from './store';
import { Context } from '../models/context';
import { Category } from '../models/category';

export class BudgetState {
  currentBudget?: Budget;
  totalAvaliable: number;
}

@Injectable()
export class BudgetStore extends Store<BudgetState> {

  constructor() {
    super(new BudgetState(), 'budget');
  }

  get avaliable() {
    let total = 0;
    this.state.currentBudget.agrupamentos.forEach(a => {
      total += a.categorias.reduce(
        (previous, current) => previous + (current.valor_orcado - current.valor_atividades), 0
      ) || 0;
    });
    return total;
  }

  async setCurrentBudget(budget: Budget): Promise<any> {
    this.setState({
      ...this.state,
      currentBudget: budget
    });
  }

  avaliableByGroup(groupId: number): number {
    const categorias = this.state.currentBudget.agrupamentos.find(a => a.id_agrupamento === groupId).categorias;
    return categorias.reduce((previous, current) => previous + (current.valor_orcado - current.valor_atividades), 0) || 0;
  }

  avaliableByCategory(categoria: Category): number {
    return categoria.valor_orcado - categoria.valor_atividades;
  }



}
