import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UserState {
  id_usuario?: number;
  token?: string;
  nome?: string;
  email?: string;
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

  get state(): UserState {
    return this._state$.getValue();
  }

  get userToken(): string {
    return this.state.token;
  }

  private static newState() {
    return { id_usuario: null };
  }
}
