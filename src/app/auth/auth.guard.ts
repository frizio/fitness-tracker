import { AuthService } from './auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.isAuth()) {
            return true;
        } else {
            this.router.navigate(['/login']);
            // return false;
        }
    }

    canLoad(route: Route) {
      if (this.authService.isAuth()) {
          return true;
      } else {
          this.router.navigate(['/login']);
          // return false;
      }
  }

}
