import { Account } from '../../../models/account';
import { Context } from '../../../models/context';
import { UserService } from '../../../services/user.service';
import { ShowMessageService } from '../../../show-message.service';
import { ServerContextService } from '../../../services/server-context.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  formNewContext: FormGroup;

  constructor(
    private serverContextService: ServerContextService,
    private showMessageService: ShowMessageService,
    public userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildFormNewContext();
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
    this.userService.createContext(context)
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

}
