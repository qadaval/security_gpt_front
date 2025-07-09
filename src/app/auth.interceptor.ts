import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // список публичных эндпоинтов, точно совпадающих по URL
    const publicExact = [
      '/api/auth/login',
      '/api/auth/register'
    ];

    // проверяем, что URL _заканчивается_ на один из publicExact
    const isExactPublic = publicExact.some(path =>
      req.url.endsWith(path)
    );

    // проверяем GET /api/auth/{username}
    const isGetUserPublic =
      req.method === 'GET' &&
      /\/api\/auth\/[^\/]+$/.test(req.url);

    // если попали в публичный эндпоинт — пропускаем без токена
    if (isExactPublic || isGetUserPublic) {
      return next.handle(req);
    }

    // иначе — добавляем токен, если он есть
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }

    return next.handle(req);
  }
}
