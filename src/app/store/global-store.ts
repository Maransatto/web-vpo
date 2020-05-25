import { Store } from './store';
import { AccountType } from '../models/account-type';
import { ServerAccountService } from '../services/backend/server-account.service';
import { Injectable } from '@angular/core';

export class GlobalState {
  public accountTypes?: AccountType[];
}

@Injectable()
export class GlobalStore extends Store<GlobalState> {

  constructor(
    private serverAccountService: ServerAccountService
  ) {
    super(new GlobalState(), 'global');
  }

  loadAccountTypes(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.serverAccountService.getTypes().subscribe(
        (data) => {
          this.setState({
            ...this.state,
            accountTypes: data.tipos_contas as AccountType[]
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
}
