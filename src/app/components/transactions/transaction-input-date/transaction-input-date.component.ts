import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';
import { ContextStore } from 'src/app/store/context-store';
import { ShowMessageService } from 'src/app/services/show-message.service';

@Component({
  selector: '[input-date]',
  templateUrl: './transaction-input-date.component.html',
  styleUrls: ['./transaction-input-date.component.css']
})
export class TransactionInputDateComponent implements OnInit {

  @Input() transaction: Transaction;

  constructor(
    private contextStore: ContextStore,
    private showMessageService: ShowMessageService,
  ) { }

  ngOnInit() {
  }

  debuga() {
    this.contextStore.updateTransaction(this.transaction)
    .catch((error) => this.showMessageService.error(error.error.message));
  }

}
