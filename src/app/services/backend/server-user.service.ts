import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { SERVER_URL } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerUserService {

  constructor(
    private http: HttpClient,
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

  public signUp(user: { nome: string, email: string, password: string }, token): Observable<any> {
    return this.http.post(`${SERVER_URL}/usuarios`, user, this.httpOptions(token));
  }

  public signIn(user: { email: string, password: string }, token): Observable<any> {
    return this.http.post(`${SERVER_URL}/usuarios/login`, user, this.httpOptions(token));
  }
}
