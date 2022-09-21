import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Credentials, User } from '../models/user';
import { isEmpty } from 'lodash';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

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

  constructor(private http: HttpClient, private router: Router) {
    this.baseUrl = 'http://localhost:8080/api/v1';

    this._loggedIn = !!JSON.parse(window.localStorage.getItem('auth_token'));

    this.user.email = !!window.localStorage.getItem('user_email')
      ? JSON.parse(window.localStorage.getItem('user_email'))
      : null;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  signUp(newUser: User): Observable<object> {
    if (isEmpty(newUser)) {
      return throwError(() => '[user.service]: not user provided');
    }
    return this.http.post(`${this.baseUrl}/users`, newUser);
  }

  logIn(credentials: Credentials): Observable<object> {
    if (!credentials.email) {
      return throwError(() => '[user.service]: not email provided');
    }
    if (!credentials.password) {
      return throwError(() => '[user.service]: not password provided');
    }

    // Delete last session info if token expired and user doesn't logout.
    if (
      JSON.parse(window.localStorage.getItem('user_email')) !==
      credentials.email
    ) {
      window.localStorage.clear();
    }

    return this.http
      .post(`${this.baseUrl}/authenticate`, { ...credentials })
      .pipe(
        tap((resp: any) => {
          if (!!resp) {
            this.user.email = credentials.email;
            window.localStorage.setItem(
              'user_email',
              JSON.stringify(this.user.email)
            );
            window.localStorage.setItem(
              'auth_token',
              JSON.stringify(resp.token)
            );

            this._loggedIn = true;
          }
        })
      );
  }

  logout(redirectToLogin: boolean = true): void {
    this._loggedIn = false;
    this.user = new User();

    if (redirectToLogin) {
      this.router.navigate(['/login']);
    }
    window.localStorage.clear();
  }
}
