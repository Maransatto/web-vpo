import { Router } from '@angular/router';
import { Context } from '../../models/context';
import { UserService } from '../../services/user.service';
import { ShowMessageService } from '../../show-message.service';
import { Component, OnInit } from '@angular/core';
import { ContextStore } from 'src/app/store/context-store';

@Component({
  selector: 'app-context',
  templateUrl: './context.component.html',
  styleUrls: ['./context.component.css']
})
export class ContextComponent implements OnInit {

  constructor(
    private showMessageService: ShowMessageService,
    public userService: UserService,
    public store: ContextStore,
    private router: Router
  ) { }

  ngOnInit() {
  }

  deleteUserContext(context: Context) {
    this.store.deleteContext(context.id_contexto).catch((error) => this.showMessageService.error(error.error.message));
  }

  setCurrentContext(context: Context) {
    this.store.setCurrentContext(context);
    this.router.navigate(['/budget']);
  }
}
