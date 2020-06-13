import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContextStore } from 'src/app/store/context-store';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from 'src/app/models/transaction';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit, OnDestroy {

  transactions: Transaction[];
  accountId: number;
  subscription: Subscription;

  allSelected = false;

  constructor(
    public contextStore: ContextStore,
    public route: ActivatedRoute
  ) {
    this.subscription = new Subscription();
  }

  async ngOnInit() {
    // TODO: ao dar o subscribe na rota, definir currenteAccount em account-store
    this.allSelected = false;
    await this.subscribeToRoute();
  }

  async subscribeToRoute(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.route.params.subscribe(
        async (params) => {
          this.accountId = params.accountId;
          await this.subscribeToContext();
          if (params.accountId) {
            this.transactions = this.transactions
                .filter(t => t.id_conta === parseInt(params.accountId, 10))
                .slice()
                .sort((a, b) => new Date(b.data).valueOf() - new Date(a.data).valueOf());
          }
          resolve();
        },
        (error) => reject()
      );
    });
  }

  async subscribeToContext(): Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.contextStore.state$.subscribe(
        (state) => {
          this.transactions = state.currentContext.transactions
              .slice()
              .sort((a, b) => new Date(b.data).valueOf() - new Date(a.data).valueOf());
          resolve();
        },
        (error) => reject()
      );
      this.subscription.add(subscription);
    });
  }

  selectRow(transaction: Transaction) {
    transaction.selected = !transaction.selected;
  }

  selectAllRows() {
    this.transactions.forEach(transaction => {
      transaction.selected = !this.allSelected;
    });
    this.allSelected = !this.allSelected;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
