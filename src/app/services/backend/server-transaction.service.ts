import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { Transaction } from 'src/app/models/transaction';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerTransactionService extends ServerService {

  constructor(private http: HttpClient) {
    super();
  }

  public updateTransaction(transaction: Transaction): Observable<any> {
    return this.http.patch(`${SERVER_URL}/transacoes/${transaction.id_transacao}`, transaction, this.httpOptions);
  }
}
