import { Context } from './../models/context';
import { UserService } from './../services/user.service';
import { ShowMessageService } from './../show-message.service';
import { ServerContextService } from './../services/server-context.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-context',
  templateUrl: './context.component.html',
  styleUrls: ['./context.component.css']
})
export class ContextComponent implements OnInit {

  constructor(
    private serverContextService: ServerContextService,
    private showMessageService: ShowMessageService,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.getUserContexts();
    console.log('userService Contexts', this.userService.contexts);
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
        console.log('deleted');
        this.userService.deleteContext(context.id_contexto);
      },
      (error) => {
        console.error(error);
        this.showMessageService.error(error.error.message);
      }
    );
  }

  setCurrentContext(context: Context) {
    this.userService.setCurrentContext(context);
  }

}
