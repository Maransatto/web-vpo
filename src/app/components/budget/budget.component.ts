import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContextStore } from 'src/app/store/context-store';
import { Context } from 'src/app/models/context';
import { Subscription } from 'rxjs';
import { ShowMessageService } from 'src/app/services/show-message.service';
import { Budget } from 'src/app/models/budget';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit, OnDestroy {

  context: Context;
  subscription: Subscription;
  budgetIndex: number;

  constructor(
    public contextStore: ContextStore,
    private showMessageService: ShowMessageService
  ) {
    this.subscription = new Subscription();
  }

  get budget(): Budget {
    if (this.context) {
      return this.context.budgets[this.budgetIndex];
    } else {
      return undefined;
    }
  }

  get lastIndex(): number {
    return this.context.budgets.length - 1;
  }

  ngOnInit() {
    const subscription = this.contextStore.state$.subscribe(
      (data) => {
        this.context = data.currentContext;
        this.budgetIndex = this.lastIndex;
        console.log('context changed');
      },
      (error) => {
        console.error(error);
        this.showMessageService.error(error.error.message);
      }
    );
    this.subscription.add(subscription);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  isTheFirst() {
    return this.budgetIndex === 0;
  }

  isTheLast() {
    return this.budgetIndex === this.lastIndex;
  }

  goToPreviousMonth() {
    if (!this.isTheFirst()) {
      this.budgetIndex--;
    }
  }

  gotoNextMonth() {
    if (!this.isTheLast()) {
      this.budgetIndex++;
    }
  }

  avaliable(budgeted: number, activities: number): number {
    return (budgeted - activities);
  }

  avaliableByGroup(id_agrupamento: number): number {
    const categorias = this.budget.agrupamentos.find(a => a.id_agrupamento === id_agrupamento).categorias;
    return categorias.reduce((previous, current) => previous + this.avaliable(current.valor_orcado, current.valor_atividades), 0) || 0;
  }

  avaliableByCategory(categoria: Category): number {
    return this.avaliable(categoria.valor_orcado, categoria.valor_atividades);
  }

}
