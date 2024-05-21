import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {User} from "src/app/model/user";
import {environment} from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  readonly currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    // @ts-ignore
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    console.log(this.currentUserSubject)
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<User> {
    return this.http.post(`${environment.apiUrl}/authenticate`, { username, password }, { observe: 'response', responseType: 'text' })
      .pipe(
        map((res: HttpResponse<string>) => {
          if (res.status === 200) {
            const token = res.body || '';
            let user: User = { username, token }; // Создаем объект User с полем token
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
          } else {
            throw new Error('Login failed');
          }
        }),
        catchError(e => {
          console.log(e);
          return throwError(e);
        })
      );
  }

  register(data: User): Observable<User> {
    return this.http.post(`${environment.apiUrl}/register`, data, { observe: 'response', responseType: 'text' })
      .pipe(
        map((res: HttpResponse<string>) => {
          if (res.status === 200) {
            const message = res.body || ''; // Сообщение от сервера, например "User registered successfully"

            // Создаем объект User с полем token, если нужно
            let user: User = { username: data.username };

            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
          } else {
            throw new Error('Signup failed');
          }
        }),
        catchError(e => {
          console.log(e);
          return throwError(e);
        })
      );
  }

  logout() {
    console.log('Logout called'); // Логирование вызова метода
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    // @ts-ignore
    this.currentUserSubject.next(null as any);
  }
}
