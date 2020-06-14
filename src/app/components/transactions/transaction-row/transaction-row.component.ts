import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';


@Component({
  selector: '[app-transaction-row]',
  templateUrl: './transaction-row.component.html',
  styleUrls: ['./transaction-row.component.css']
})
export class TransactionRowComponent implements OnInit {

  @Input() transaction: Transaction;
  @Input() accountId: number;

  @Output() uncheckOthers = new EventEmitter<number>();

  constructor() { }

  ngOnInit() { }

  checkRow(transaction: Transaction) {
    transaction.selected = !transaction.selected;
  }

  selectRow(transaction: Transaction) {
    transaction.selected = !transaction.selected;
    this.uncheckOthers.emit(transaction.id_transacao);
  }

}
