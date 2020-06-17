import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';
import { ContextStore } from 'src/app/store/context-store';
import { ShowMessageService } from 'src/app/services/show-message.service';
import { Subscription } from 'rxjs';
import { Account } from 'src/app/models/account';

@Component({
  selector: '[input-account]',
  templateUrl: './transaction-input-account.component.html',
  styleUrls: ['./transaction-input-account.component.css']
})
export class TransactionInputAccountComponent implements OnInit, OnDestroy {

  @Input() transaction: Transaction;

  subscriptions: Subscription;
  accounts: Account[];

  constructor(
    public contextStore: ContextStore,
    public showMessageService: ShowMessageService
  ) {
    this.subscriptions = new Subscription();
  }

  ngOnInit() {
    const subscription = this.contextStore.state$.subscribe(state => {
      this.accounts = state.currentContext.accounts;
    });
    this.subscriptions.add(subscription);
  }

  onAccountChanged(accountId) {
    this.transaction.id_conta = +accountId;
    this.transaction.nome_conta = this.accounts.find(
      a => a.id_conta === +accountId
    ).nome;
    this.contextStore.updateTransaction(this.transaction)
      .catch((error) => this.showMessageService.error(error.error.message));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
