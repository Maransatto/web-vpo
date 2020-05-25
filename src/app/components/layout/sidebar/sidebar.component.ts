import { ShowMessageService } from '../../../services/show-message.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ContextStore } from 'src/app/store/context-store';
import { Context } from 'src/app/models/context';
import { Subscription } from 'rxjs';
import { Account } from 'src/app/models/account';
import { GlobalStore } from 'src/app/store/global-store';
import { AccountStore } from 'src/app/store/account-store';

declare var $: any;


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  formNewContext: FormGroup;
  formNewAccount: FormGroup;
  subscriptions: Subscription;

  public activeAccounts: Account[];
  public inactiveAccounts: Account[];

  constructor(
    private showMessageService: ShowMessageService,
    public contextStore: ContextStore,
    public accountStore: AccountStore,
    public globalStore: GlobalStore,
    private router: Router
  ) {
    this.subscriptions = new Subscription();
  }

  ngOnInit() {
    this.buildFormNewContext();
    this.buildFormNewAccount();
    this.getAccounts();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  buildFormNewContext() {
    this.formNewContext = new FormGroup({
      nome: new FormControl('', [Validators.required])
    });
  }

  buildFormNewAccount() {
    this.formNewAccount = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      id_tipo_conta: new FormControl('', [Validators.required]),
      saldo_inicial: new FormControl('', [Validators.required])
    });
  }

  onNewContextSubmit() {
    if (!this.formNewContext.valid) {
      return;
    }

    const context = this.formNewContext.value as Context;
    this.contextStore.create(context)
      .then((data) => {
        this.showMessageService.success(data.message);
        $('#novoContextoModal').modal('toggle');
        this.formNewContext.reset();
        this.router.navigate(['/context']);
      })
      .catch(error => {
        this.showMessageService.error(error.error.message);
      });
  }

  onNewAccountSubmit() {
    if (!this.formNewAccount.valid) {
      return;
    }

    const account = this.formNewAccount.value as Account;
    account.id_contexto = this.contextStore.state.currentContext.id_contexto;
    this.accountStore.create(account)
      .then((data) => {
        this.showMessageService.success(data.message);
        $('#novaContaModal').modal('toggle');
        this.formNewAccount.reset();
        this.router.navigate(['/transactions', 'account', data.conta.id_conta]);
      }).catch((error) => {
        this.showMessageService.error(error.error.message);
      });
  }

  isCurrenteContextActive(): boolean {
    return this.contextStore.state.currentContext ? true : false;
  }

  getAccounts() {
    this.subscriptions.add(this.contextStore.state$.subscribe(
      (data) => {
        console.log('sidebar getAccounts', data);

        if (data.currentContext) {
          this.activeAccounts = data.currentContext.accounts.filter(a => !a.encerrada);
          this.inactiveAccounts = data.currentContext.accounts.filter(a => a.encerrada);
        }
      },
      (error) => {
        console.error(error);
        this.showMessageService.error(error.error.message);
      }
    ));
  }

}
