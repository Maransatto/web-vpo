import { ShowMessageService } from '../../../services/show-message.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContextStore } from 'src/app/store/context-store';
import { Context } from 'src/app/models/context';

declare var $: any;


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  formNewContext: FormGroup;

  constructor(
    private showMessageService: ShowMessageService,
    public contextStore: ContextStore,
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

}
