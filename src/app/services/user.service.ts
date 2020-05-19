import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UserState {
  id_usuario?: number;
  token?: string;
  nome?: string;
  email?: string;
  contextos?: {
    id_contexto: number;
    nome: string
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
    this._state$ = new BehaviorSubject(UserService.newState());
    this.state$ = this._state$.asObservable();
  }

  state$: Observable<UserState>;
  private _state$: BehaviorSubject<UserState>;

  static isAuthenticated(state) {
    return state.token !== null && state.token !== undefined;
  }

  get state(): UserState {
    return this._state$.getValue();
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

  get contexts(): { id_contexto: number, nome: string }[] {
    return this.state.contextos;
  }



  private static newState() {
    return { id_usuario: null };
  }

  async load(): Promise<UserState> {
    const state = await JSON.parse(localStorage.getItem('user'));
    console.log('user state', state);

    if (state) {
      this._state$.next(state);
      return state;
    } else {
      return this.state;
    }
  }

  save() {
    localStorage.setItem('user', JSON.stringify(this.state));
  }

  clear() {
    localStorage.removeItem('user');
    this._state$.next(UserService.newState());
  }

  async update(data) {
    const state = this.state;

    if (data.id_usuario)  { state.id_usuario  = data.id_usuario; }
    if (data.token)       { state.token       = data.token; }
    if (data.nome)        { state.nome        = data.nome; }
    if (data.email)       { state.email       = data.email; }

    if (data.contextos) { state.contextos = data.contextos; }

    this._state$.next(state);
    this.save();
    return state;
  }

  isAuthenticated() {
    return UserService.isAuthenticated(this.state);
  }

  addContext(context: { id_contexto: number, nome: string }): void {
    this.state.contextos.push(context);
  }

}
