import { BudgetStore } from './../../store/budget-store';
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
  currentIndex: number;
  budget: Budget;

  constructor(
    public contextStore: ContextStore,
    public budgetStore: BudgetStore,
    private showMessageService: ShowMessageService
  ) {
    this.subscription = new Subscription();
  }

  get lastIndex(): number {
    return this.context.budgets.length - 1;
  }

  async ngOnInit() {
    this.subscribeToContext();
    this.subscribeToBudget();
  }

  async subscribeToContext() {
    const subscription = this.contextStore.state$.subscribe(
      (data) => {
        this.context = data.currentContext;
        this.setCurrentBudget(this.lastIndex - 1); // mês atual como padrão (pois sempre haverá o mês seguinte)
      },
      (error) => {
        console.error(error);
        this.showMessageService.error(error.error.message);
      }
    );
    this.subscription.add(subscription);
  }

  async subscribeToBudget() {
    const subscription = this.budgetStore.state$.subscribe(
      (data) => {
        this.budget = data.currentBudget;
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

  setCurrentBudget(index: number) {
    this.currentIndex = index;
    this.budgetStore.setCurrentBudget(this.context.budgets[this.currentIndex]);
  }

  isTheFirst() {
    return this.currentIndex === 0;
  }

  isTheLast() {
    return this.currentIndex === this.lastIndex;
  }

  goToPreviousMonth() {
    if (!this.isTheFirst()) {
      this.setCurrentBudget(this.currentIndex - 1);
    }
  }

  gotoNextMonth() {
    if (!this.isTheLast()) {
      this.setCurrentBudget(this.currentIndex + 1);
    }
  }

}
