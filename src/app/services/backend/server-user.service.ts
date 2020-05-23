import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SERVER_URL } from '../../../environments/environment';
import { ServerService } from '../server.service';

@Injectable({
  providedIn: 'root'
})
export class ServerUserService extends ServerService {

  constructor(
    private http: HttpClient,
  ) {
    super();
  }

  public signUp(user: { nome: string, email: string, password: string }): Observable<any> {
    return this.http.post(`${SERVER_URL}/usuarios`, user, this.httpOptions);
  }

  public signIn(user: { email: string, password: string }): Observable<any> {
    return this.http.post(`${SERVER_URL}/usuarios/login`, user, this.httpOptions);
  }
}
