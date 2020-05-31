import { Account } from './account';
import { Budget } from './budget';
export class Context {
  constructor(
    public id_contexto: number,
    public nome: number,
    public accounts: Account[],
    public budgets: Budget[]
  ) {
  }
}
