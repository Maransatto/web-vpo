import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ContextStore } from 'src/app/store/context-store';
import { ShowMessageService } from 'src/app/services/show-message.service';
@Component({
  selector: '[input-inflow]',
  templateUrl: './transaction-input-inflow.component.html',
  styleUrls: ['./transaction-input-inflow.component.css']
})
export class TransactionInputInflowComponent implements OnInit {

  @Input() transaction: Transaction;

  @ViewChild('input', { static: true }) input: ElementRef;

  constructor(
    private contextStore: ContextStore,
    private showMessageService: ShowMessageService,
  ) { }

  ngOnInit() {
    this.subscribeToInputKeyUp();
  }

  clearOutflow() {
    this.transaction.valor_saida = 0;
  }

  subscribeToInputKeyUp() {
    fromEvent(this.input.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      }),
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((value: number) => {
      this.contextStore.updateTransaction(this.transaction)
        .catch((error) => this.showMessageService.error(error.error.message));
    });
  }

  toNumber() {
    this.transaction.valor_entrada = +this.transaction.valor_entrada;
    this.clearOutflow();
  }

  getOut() {
    this.transaction.selected = false;
  }

}
