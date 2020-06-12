import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';

@Component({
  selector: '[app-transaction-input]',
  templateUrl: './transaction-input.component.html',
  styleUrls: ['./transaction-input.component.css']
})
export class TransactionInputComponent implements OnInit {

  @Input() transaction: Transaction;

  constructor() { }

  ngOnInit() {
  }

}
