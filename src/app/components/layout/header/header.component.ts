import { AuthService } from '../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserStore, UserState } from 'src/app/store/user-store';
import { Subscription } from 'rxjs';
import { ContextStore } from 'src/app/store/context-store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  nomeUsuario: string;
  emailUsuario: string;

  subscription: Subscription;

  constructor(
    private userStore: UserStore,
    private contextStore: ContextStore,
    private authService: AuthService
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit() {
    this.nomeUsuario = this.userStore.nome;
    this.emailUsuario = this.userStore.email;
  }

  logout() {
    this.userStore.logOut();
    this.authService.rootRedirect(new UserState());
  }
}
