import { Injectable } from '@angular/core';
import { ServerAccountService } from '../services/backend/server-account.service';
import { Store } from './store';
import { Account } from '../models/account';
import { GlobalStore } from './global-store';
import { ContextStore } from './context-store';

export class AccountState {
  public currentAccount?: Account;
}

@Injectable()
export class AccountStore extends Store<AccountState> {

  constructor(
    private serverAccountService: ServerAccountService,
    private globalStore: GlobalStore,
    private contextStore: ContextStore
  ) {
    super(new AccountState(), 'account');
  }

  create(account: Account): Promise<any> {
    return new Promise((resolve, reject) => {
      this.serverAccountService.createAccount(account).subscribe(
        (data) => {
          const createdAccount = data.conta as Account;
          createdAccount.accountType =
            this.globalStore.state.accountTypes.find(t => t.id_tipo_conta === createdAccount.id_tipo_conta);
          this.setState({
            ...this.state,
            currentAccount: createdAccount
          });
          this.contextStore.addAccount(createdAccount);
          resolve(data);
        },
        (error) => {
          console.error(error);
          reject(error);
        }
      );
    });
  }

}
