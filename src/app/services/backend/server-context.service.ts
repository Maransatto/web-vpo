import { Observable } from 'rxjs';
// import { UserService } from './user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SERVER_URL } from '../../../environments/environment';
import { Context } from '../../models/context';

@Injectable({
  providedIn: 'root'
})
export class ServerContextService {

  constructor(
    private http: HttpClient,
    // private userService: UserService
  ) { }

  httpOptions(token) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return {
      headers
    };
  }

  public createContext(context: Context, token): Observable<any> {
    return this.http.post(`${SERVER_URL}/contextos`, context, this.httpOptions(token));
  }

  public getContexts(token): Observable<any> {
    return this.http.get(`${SERVER_URL}/contextos`, this.httpOptions(token));
  }

  public deleteContext(contextId: number, token): Observable<any> {
    return this.http.delete(`${SERVER_URL}/contextos/${contextId}`, this.httpOptions(token));
  }

  public getAccounts(contextId: number, token): Observable<any> {
    return this.http.get(`${SERVER_URL}/contextos/${contextId}/contas`, this.httpOptions(token));
  }

}
