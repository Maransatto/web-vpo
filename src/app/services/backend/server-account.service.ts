import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerService } from './server.service';
import { Account } from 'src/app/models/account';
import { Observable } from 'rxjs';
import { SERVER_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerAccountService extends ServerService {

  constructor(private http: HttpClient) {
    super();
  }

  public getTypes(): Observable<any> {
    return this.http.get(`${SERVER_URL}/contas/tipos`, this.httpOptions);
  }

  public createAccount(account: Account): Observable<any> {
    return this.http.post(`${SERVER_URL}/contas`, account, this.httpOptions);
  }
}
