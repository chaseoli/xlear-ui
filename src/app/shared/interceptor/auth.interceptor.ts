import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http'
import { AngularFireAuth } from '@angular/fire/auth'
import { Observable, from } from 'rxjs'
import { switchMap } from 'rxjs/operators'
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AngularFireAuth) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(
      this.auth.auth.currentUser.getIdToken(/* forceRefresh */ true)
    ).pipe(
      switchMap((idToken) => {
        request = request.clone({
          setHeaders: {
            'X-auth': idToken,
            'Content-Type': 'application/json; charset=utf-8',
          },
        })
        return next.handle(request)
      })
    )
  }
}
