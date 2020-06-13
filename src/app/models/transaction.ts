import { Injectable } from '@angular/core';
import { Category } from './category';

@Injectable()
export class Transaction {
  constructor(
    public id_transacao: number,
    public id_conta: number,
    public nome_conta: string,
    public id_contexto: number,
    public id_contato: number,
    public nome_contato: string,
    public data: Date,
    public aprovada: boolean,
    public conciliada: boolean,
    public nota: string,
    public valor_saida: number,
    public valor_entrada: number,
    public categorias?: Category[],
    public selected?: boolean
  ) {
  }
}
