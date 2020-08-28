import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RoleService, AuthService, TokenService } from 'src/app/services';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanLoad {

  constructor(
    protected readonly authService: AuthService,
    protected readonly roleService: RoleService,
    protected readonly tokenService: TokenService,
    protected readonly router: Router
  ) { }
  public canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    return this.authService.touchToken().then((account) => {
      return true;
    }).catch((err) => {
      this.tokenService.clearToken();
      this.router.navigate(['auth/login']);
      return false;
    });
  }

}
