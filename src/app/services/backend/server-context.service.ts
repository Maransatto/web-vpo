import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SERVER_URL } from '../../../environments/environment';
import { Context } from '../../models/context';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class ServerContextService extends ServerService {

  constructor(private http: HttpClient) {
    super();
  }

  public createContext(context: Context): Observable<any> {
    return this.http.post(`${SERVER_URL}/contextos`, context, this.httpOptions);
  }

  public getContexts(): Observable<any> {
    return this.http.get(`${SERVER_URL}/contextos`, this.httpOptions);
  }

  public deleteContext(contextId: number): Observable<any> {
    return this.http.delete(`${SERVER_URL}/contextos/${contextId}`, this.httpOptions);
  }

  public getAccounts(contextId: number): Observable<any> {
    return this.http.get(`${SERVER_URL}/contextos/${contextId}/contas`, this.httpOptions);
  }

  public getBudgets(contextId: number): Observable<any> {
    return this.http.get(`${SERVER_URL}/contextos/${contextId}/orcamentos`, this.httpOptions);
  }

}
