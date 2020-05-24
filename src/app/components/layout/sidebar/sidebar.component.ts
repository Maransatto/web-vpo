import { ShowMessageService } from '../../../services/show-message.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ContextStore } from 'src/app/store/context-store';
import { Context } from 'src/app/models/context';
import { Subscription } from 'rxjs';
import { Account } from 'src/app/models/account';

declare var $: any;


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  formNewContext: FormGroup;
  subscriptions: Subscription;

  public activeAccounts: Account[];
  public inactiveAccounts: Account[];

  constructor(
    private showMessageService: ShowMessageService,
    public contextStore: ContextStore,
    private router: Router
  ) {
    this.subscriptions = new Subscription();
  }

  ngOnInit() {
    this.buildFormNewContext();
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

  onCriarContaNova() {
    console.log('nova conta criada');
  }

  onNewContextSubmit() {
    if (!this.formNewContext.valid) {
      return;
    }

    const context = this.formNewContext.value as Context;
    this.contextStore.createContext(context)
      .then((data) => {
        this.showMessageService.success(data.message);
        $('#novoContextoModal').modal('toggle');
        this.formNewContext.reset();
        this.router.navigate(['/context']);
      })
      .catch(error => {
        console.error(error);
        this.showMessageService.error(error.error.message);
        $('#novoContextoModal').modal('toggle');
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
