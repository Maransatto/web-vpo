import { Account } from './account';
import { Budget } from './budget';
import { Injectable } from '@angular/core';

@Injectable()
export class Context {
  constructor(
    public id_contexto: number,
    public nome: number,
    public accounts: Account[],
    public budgets: Budget[]
  ) {
  }
}
