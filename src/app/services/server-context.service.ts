import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SERVER_URL } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerContextService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }


  get httpOptions() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${this.userService.userToken}`);
    return {
      headers
    };
  }

  public createContext(context: { nome: string }): Observable<any> {
    return this.http.post(`${SERVER_URL}/contextos`, context, this.httpOptions);
  }

  public getContexts(): Observable<any> {
    return this.http.get(`${SERVER_URL}/contextos`, this.httpOptions);
  }

  public deleteContext(contextId: number ): Observable<any> {
    return this.http.delete(`${SERVER_URL}/contextos/${contextId}`, this.httpOptions);
  }

  public getAccounts(contextId: number): Observable<any> {
    return this.http.get(`${SERVER_URL}/contextos/${contextId}/contas`, this.httpOptions);
  }

}
