import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SERVER_URL } from '../../../environments/environment';
import { Context } from '../../models/context';
import { UserStore } from 'src/app/store/user-store';

@Injectable({
  providedIn: 'root'
})
export class ServerContextService {

  constructor(
    private http: HttpClient,
    private userStore: UserStore
  ) { }

  get httpOptions() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${this.userStore.userToken}`);
    return {
      headers
    };
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

}
