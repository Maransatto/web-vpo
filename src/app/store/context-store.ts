import { ServerContextService } from './../services/server-context.service';
import { UserService } from './../services/user.service';
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
    private userService: UserService
  ) {
    super(new ContextState());
  }

  createContext(context: Context): Promise<any> {
    return new Promise((resolve, reject) => {
      this.serverContextService.createContext(context, this.userService.userToken).subscribe(
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
      this.serverContextService.deleteContext(contextId, this.userService.userToken).subscribe(
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

  loadContexts(): Promise<any> {
    console.log('loadContexts');

    return new Promise((resolve, reject) => {
      this.serverContextService.getContexts(this.userService.userToken).subscribe(
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
    this.serverContextService.getAccounts(context.id_contexto, this.userService.userToken).subscribe(
      (data) => {
        context.accounts = data.contas as Account[];
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
