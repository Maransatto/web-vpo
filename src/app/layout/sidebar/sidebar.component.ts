import { ShowMessageService } from './../../show-message.service';
import { ServerContextService } from './../../services/server-context.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

declare var $: any;


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  nomeContextoAtual = 'Nome do Contexto';
  nomeContextoNovo: string;
  nomeNovaConta: string;

  formNewContext: FormGroup;

  constructor(
    private serverContextService: ServerContextService,
    private showMessageService: ShowMessageService
  ) { }

  ngOnInit() {
    this.buildFormNewContext();
  }

  buildFormNewContext() {
    this.formNewContext = new FormGroup({
      nome: new FormControl('', [Validators.required])
    });
  }

  onCriarContextoNovo() {
    console.log('novo contexto criado');
  }

  onCriarContaNova() {
    console.log('nova conta criada');
  }

  onNewContextSubmit() {
    console.log('onNewContextSubmit form valid', this.formNewContext.valid);

    if (!this.formNewContext.valid) {
      return;
    }

    const context = this.formNewContext.value;
    this.serverContextService.createContext(context).subscribe(
      (data) => {
        console.log(data);
        this.showMessageService.success('Contexto incluído com sucesso');
        $('#novoContextoModal').modal('toggle');
      },
      (error) => {
        console.error(error);
        this.showMessageService.error(error.error.message);
        $('#novoContextoModal').modal('toggle');
      }
    );

  }

}
