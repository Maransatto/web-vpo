import { AccountType } from './account-type';
import { Injectable } from '@angular/core';

@Injectable()
export class Account {
  constructor(
    public id_conta: number,
    public id_contexto: number,
    public id_tipo_conta: number,
    public nome: string,
    public encerrada: boolean,
    public accountType: AccountType
  ) {
  }
}
