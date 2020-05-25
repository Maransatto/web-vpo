import { Injectable } from '@angular/core';
import { Context } from '../models/context';
import { Store } from './store';
import { ServerUserService } from '../services/backend/server-user.service';
import { ContextStore } from './context-store';

export class UserState {
  id_usuario?: number;
  token?: string;
  nome?: string;
  email?: string;
  contextos?: Context[];
  currentContext?: Context;
}

@Injectable()
export class UserStore extends Store<UserState> {

  constructor(
    private serverUserService: ServerUserService,
    private contextStore: ContextStore
  ) {
    super(new UserState(), 'user');
  }

  static isAuthenticated(state: UserState) {
    return state.token !== null && state.token !== undefined;
  }
  get userToken(): string {
    return this.state.token;
  }

  get nome(): string {
    return this.state.nome;
  }

  get email(): string {
    return this.state.email;
  }

  async update(data) {
    const state = this.state;

    if (data.id_usuario)  { state.id_usuario  = data.id_usuario; }
    if (data.token)       { state.token       = data.token; }
    if (data.nome)        { state.nome        = data.nome; }
    if (data.email)       { state.email       = data.email; }

    if (data.contextos) { state.contextos = data.contextos; }

    this.setState(this.state);
    return state;
  }

  isAuthenticated() {
    return UserStore.isAuthenticated(this.state);
  }

  signIn(user): Promise<any> {
    return new Promise((resolve, reject) => {
      this.serverUserService.signIn(user).subscribe(data => {
        this.update(data);
        resolve(data);
      }, (error) => {
        console.error(error);
        reject(error);
      });
    });
  }

  signUp(user): Promise<any> {
    return new Promise((resolve, reject) => {
      this.serverUserService.signUp(user).subscribe(data => {
        resolve(data);
      }, (error) => {
        console.error(error);
        reject(error);
      });
    });
  }

  logOut() {
    this.clear();
  }
}
