import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { InfinityBarService } from './infinity-bar.service';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private router: Router,
    private infinitiBarService: InfinityBarService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.infinitiBarService.show();
    const token = this.tokenService.getToken();
    request = token ? request.clone(
      {
        reportProgress: true,
        setHeaders: {
          authorization: `${token.AccessToken}`,
        },
      }
    ) : request.clone({ reportProgress: true });
    return next.handle(request).pipe(tap(
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {

          }
        }
      }
    ), finalize(() => {
      this.infinitiBarService.hide();
    })
    );
  }

}
