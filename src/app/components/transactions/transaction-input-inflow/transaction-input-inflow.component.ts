import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';

@Component({
  selector: '[input-inflow]',
  templateUrl: './transaction-input-inflow.component.html',
  styleUrls: ['./transaction-input-inflow.component.css']
})
export class TransactionInputInflowComponent implements OnInit {

  @Input() transaction: Transaction;

  constructor() { }

  ngOnInit() {
  }

}
