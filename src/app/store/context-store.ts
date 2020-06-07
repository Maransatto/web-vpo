import { ServerBudgetService } from './../services/backend/server-budget.service';
import { ServerContextService } from '../services/backend/server-context.service';
import { Injectable } from '@angular/core';
import { Context } from '../models/context';
import { Store } from './store';
import { Account } from '../models/account';
import { Budget } from '../models/budget';
import { BudgetCategory } from '../models/budgetCategory';
import { Transaction } from '../models/transaction';

export class ContextState {
  contexts?: Context[];
  currentContext?: Context;
}

@Injectable()
export class ContextStore extends Store<ContextState> {

  constructor(
    private serverContextService: ServerContextService,
    private serverBudgetService: ServerBudgetService
  ) {
    super(new ContextState(), 'context');
  }

  create(context: Context): Promise<any> {
    return new Promise((resolve, reject) => {
      this.serverContextService.createContext(context).subscribe(
        (data) => {
          this.setState({
            ...this.state,
            contexts: [...this.state.contexts, data.contexto as Context]
          });
          resolve(data);
        },
        (error) => {
          console.error(error);
          reject(error);
        }
      );
    });
  }

  deleteContext(contextId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.serverContextService.deleteContext(contextId).subscribe(
        (data) => {
          const index = this.state.contexts.findIndex(context => context.id_contexto === contextId);
          this.state.contexts.splice(index, 1);
          this.setState({
            ...this.state,
            contexts: this.state.contexts
          });
          resolve();
        },
        (error) => {
          console.error(error);
          reject(error);
        }
      );
    });
  }

  getUserContexts(): Promise<ContextState> {
    return new Promise((resolve, reject) => {
      this.serverContextService.getContexts().subscribe(
        (data) => {
          this.setState({
            ...this.state,
            contexts: data.contextos as Context[]
          });
          resolve();
        },
        (error) => {
          console.error(error);
          reject(error);
        }
      );
    });
  }

  async setCurrentContext(context: Context): Promise<any> {
    await this.getAccounts(context);
    await this.getBudgets(context);
    await this.getTransactions(context);
    this.setState({
      ...this.state,
      currentContext: context,
    });
  }

  getAccounts(context: Context): Promise<any> {
    return new Promise((resolve, reject) => {
      this.serverContextService.getAccounts(context.id_contexto).subscribe(
        (data) => {
          context.accounts = data.contas as Account[];
          resolve();
        },
        (error) => {
          console.error(error);
          reject();
        }
      );
    });
  }

  getBudgets(context: Context): Promise<any> {
    return new Promise((resolve, reject) => {
      this.serverContextService.getBudgets(context.id_contexto).subscribe(
        (data) => {
          context.budgets = data.orcamentos as Budget[];
          resolve();
        },
        (error) => {
          console.error(error);
          reject();
        }
      );
    });
  }

  getTransactions(context: Context): Promise<any> {
    return new Promise((resolve, reject) => {
      this.serverContextService.getTransactions(context.id_contexto).subscribe(
        (data) => {
          context.transactions = data.transacoes as Transaction[];
          console.log('transactions', context.transactions);

          resolve();
        },
        (error) => {
          console.error(error);
          reject();
        }
      );
    });
  }

  addAccount(account: Account) {
    this.state.currentContext.accounts.push(account);
    this.setState({
      ...this.state
    });
  }

  changeBudgetValue(budgetCategory: BudgetCategory): Promise<any> {
    return new Promise((resolve, reject) => {
      this.serverBudgetService.changeBudgetValue(budgetCategory).subscribe(
        (data) => {
          resolve();
        },
        (error) => {
          console.error(error);
          reject();
        }
      );
    });
  }
}
