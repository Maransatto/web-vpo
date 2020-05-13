import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  nomeUsuario = 'Fernando Silva Maransatto';
  emailUsuario = 'fernando.maransatto@gmail.com';

  constructor() { }

  ngOnInit() {
  }

  logOff() {
    console.log('remover token e redirecionar');
  }

}
