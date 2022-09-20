import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string;

  private _user: User = new User();
  private userSource = new Subject<User>();
  user$ = this.userSource.asObservable();

  private _loggedIn = false;

  get user(): User {
    return this._user;
  }

  set user(user: User) {
    if (!user) {
      return;
    }
    this._user = user;
    this.userSource.next(this._user);
  }

  get loggedIn(): boolean {
    return !!JSON.parse(window.localStorage.getItem('auth_token'));
  }

  constructor() {
    this.baseUrl = 'http://localhost:8080/api/v1/';

    this._loggedIn = !!JSON.parse(window.localStorage.getItem('auth_token'));

    this.user.id = !!window.localStorage.getItem('user_id')
      ? JSON.parse(window.localStorage.getItem('user_id'))
      : null;

    this.user.name = !!window.localStorage.getItem('user_name')
      ? JSON.parse(window.localStorage.getItem('user_name'))
      : null;

    this.user.lastname = !!window.localStorage.getItem('user_lastname')
      ? JSON.parse(window.localStorage.getItem('user_lastname'))
      : null;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
