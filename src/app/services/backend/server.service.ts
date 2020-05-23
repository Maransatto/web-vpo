import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { UserState } from '../../store/user-store';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor() { }

  get httpOptions() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${this.userToken}`);
    return {
      headers
    };
  }

  get userToken() {
    if (localStorage.getItem('user')) {
      return (JSON.parse(localStorage.getItem('user')) as UserState).token;
    } else {
      return '';
    }
  }
}
