import { Account } from './account';
export class Context {
  constructor(
    public id_contexto: number,
    public nome: number,
    public accounts: Account[]
  ) {
  }
}
