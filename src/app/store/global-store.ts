import { Store } from './store';
import { AccountType } from '../models/account-type';
import { ServerAccountService } from '../services/backend/server-account.service';
import { Injectable } from '@angular/core';
import { ContextStore } from './context-store';
import { AccountStore } from './account-store';

export class GlobalState {
  public accountTypes?: AccountType[];
}

@Injectable()
export class GlobalStore extends Store<GlobalState> {

  constructor(
    private serverAccountService: ServerAccountService,
    private contextStore: ContextStore,
    private accountStore: AccountStore
  ) {
    super(new GlobalState(), 'global');
  }

  loadAccountTypes(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.serverAccountService.getTypes().subscribe(
        (data) => {
          console.log('loadAccountTypes -> ', data);

          this.setState({
            ...this.state,
            accountTypes: data.tipos_contas as AccountType[]
          });

          console.log(this.state);

          resolve();
        },
        (error) => {
           console.error(error);
           reject(error);
        }
      );
    });
  }

  loadEveryThing(): Promise<any> {
    return Promise.all([
      this.loadAccountTypes(),
      this.contextStore.load(),
      this.accountStore.load()
    ]);
  }

  clearEveryThing() {
    this.clear();
    this.contextStore.clear();
    this.accountStore.clear();
  }

}
