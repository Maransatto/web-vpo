import { Component, OnInit } from '@angular/core';
import { ContextStore } from 'src/app/store/context-store';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  constructor(
    public contextStore: ContextStore
  ) { }

  ngOnInit() {
  }

}
