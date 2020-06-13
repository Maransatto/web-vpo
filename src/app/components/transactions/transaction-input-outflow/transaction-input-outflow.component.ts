import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';
import { ContextStore } from 'src/app/store/context-store';
import { ShowMessageService } from 'src/app/services/show-message.service';
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: '[input-outflow]',
  templateUrl: './transaction-input-outflow.component.html',
  styleUrls: ['./transaction-input-outflow.component.css']
})
export class TransactionInputOutflowComponent implements OnInit {

  @Input() transaction: Transaction;

  @ViewChild('input', {static: true}) input: ElementRef;

  constructor(
    private contextStore: ContextStore,
    private showMessageService: ShowMessageService
  ) { }

  ngOnInit() {
  }

  clearInflow() {
    this.transaction.valor_entrada = 0;
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
    this.transaction.valor_saida = +this.transaction.valor_saida;
    this.clearInflow();
  }

}
