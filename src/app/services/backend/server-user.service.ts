import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { SERVER_URL } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerUserService {

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

  public signUp(user: { nome: string, email: string, password: string }): Observable<any> {
    return this.http.post(`${SERVER_URL}/usuarios`, user, this.httpOptions);
  }

  public signIn(user: { email: string, password: string }): Observable<any> {
    return this.http.post(`${SERVER_URL}/usuarios/login`, user, this.httpOptions);
  }
}
