import { Router } from '@angular/router';
import { Context } from './../models/context';
import { UserService } from './../services/user.service';
import { ShowMessageService } from './../show-message.service';
import { ServerContextService } from './../services/server-context.service';
import { Component, OnInit } from '@angular/core';
import { Account } from '../models/account';

@Component({
  selector: 'app-context',
  templateUrl: './context.component.html',
  styleUrls: ['./context.component.css']
})
export class ContextComponent implements OnInit {

  constructor(
    private serverContextService: ServerContextService,
    private showMessageService: ShowMessageService,
    public userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUserContexts();
  }

  getUserContexts() {
    this.serverContextService.getContexts().subscribe(
      (data) => { this.userService.update(data); },
      (error) => { console.error(error); this.showMessageService.error(error.error.message); }
    );
  }

  deleteUserContext(context: Context) {
    this.serverContextService.deleteContext(context.id_contexto).subscribe(
      (data) => {
        this.userService.deleteContext(context.id_contexto);
      },
      (error) => {
        console.error(error);
        this.showMessageService.error(error.error.message);
      }
    );
  }

  async setCurrentContext(context: Context) {
    this.userService.setCurrentContext(context);
    this.loadAccounts(context);
    console.log('context.component.ts -> currentContext', context);

    this.router.navigate(['/budget']);
  }

  loadAccounts(context: Context): void {
    this.serverContextService.getAccounts(context.id_contexto).subscribe(
      (data) => {
        this.userService.setCurrentAccounts(data.contas as Account[]);
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
