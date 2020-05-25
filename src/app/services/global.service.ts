import { Injectable } from '@angular/core';
import { GlobalStore } from '../store/global-store';
import { ContextStore } from '../store/context-store';
import { AccountStore } from '../store/account-store';
import { Context } from '../models/context';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(
    private globalStore: GlobalStore,
    private contextStore: ContextStore,
    private accountStore: AccountStore
  ) { }

  /**
   * Carrega todo conteúdo do servidor (chamadas HTTP), necessário após o login.
   * Estes métodos sempre salvam o conteúdo no localStorage
   * @param currentContext Contexto atual do usuário
   */
  loadServerData(currentContext: Context): Promise<any> {
    return Promise.all([
      this.globalStore.loadAccountTypes(),
      this.contextStore.getUserContexts(),
      this.contextStore.getAccounts(currentContext)
    ]);
  }

  /**
   * Carrega todo conteúdo já armazenado em localStorage
   */
  loadStorageData(): Promise<any> {
    return Promise.all([
      this.globalStore.load(),
      this.contextStore.load(),
      this.accountStore.load()
    ]);
  }

  /**
   * Limpa todo conteúdo armazenado em localStorage (quando faz logoff)
   */
  clearStorageData(): void {
    this.globalStore.clear();
    this.contextStore.clear();
    this.accountStore.clear();
  }
}
