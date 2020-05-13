import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  nomeContextoAtual = 'Nome do Contexto';
  nomeContextoNovo: string;

  constructor() { }

  ngOnInit() {
  }

  onCriarContextoNovo() {
    console.log('novo contexto criado');

  }

}
