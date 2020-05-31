import { Injectable } from '@angular/core';

@Injectable()
export class AccountType {
  constructor(
    public id_tipo_conta: number,
    public nome: string,
    public saldo_inicial: number
  ) { }
}
