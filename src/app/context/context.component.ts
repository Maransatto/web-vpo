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
      (data) => {
        console.log(data);
        this.userService.update(data);
      },
      (error) => { console.error(error); this.showMessageService.error(error.error.message); }
    );
  }

}
