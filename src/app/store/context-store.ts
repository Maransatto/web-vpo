import { ServerContextService } from '../services/backend/server-context.service';
import { Injectable } from '@angular/core';
import { Context } from '../models/context';
import { Store } from './store';
import { Account } from '../models/account';

export class ContextState {
  contexts?: Context[];
  currentContext?: Context;
}

@Injectable()
export class ContextStore extends Store<ContextState> {

  constructor(
    private serverContextService: ServerContextService,
  ) {
    super(new ContextState(), 'context');
  }

  createContext(context: Context): Promise<any> {
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

  setCurrentContext(context: Context): void {
    this.loadAccounts(context);
    this.setState({
      ...this.state,
      currentContext: context
    });
  }

  loadAccounts(context: Context): void {
    this.serverContextService.getAccounts(context.id_contexto).subscribe(
      (data) => {
        context.accounts = data.contas as Account[];
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
