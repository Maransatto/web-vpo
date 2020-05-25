import { Injectable } from '@angular/core';
import { ServerAccountService } from '../services/backend/server-account.service';
import { Store } from './store';
import { AccountType } from '../models/account-type';

export class AccountState {
  public id_conta?: number;
  public id_tipo_conta?: number;
  public nome?: string;
}

@Injectable()
export class AccountStore extends Store<AccountState> {

  constructor(
    private serverAccountService: ServerAccountService
  ) {
    super(new AccountState(), 'account');
  }



}
