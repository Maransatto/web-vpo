import { UserService, UserState } from './services/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.userService.isAuthenticated()) {
      this.router.navigate(['/signin']);
      return false;
    }
    return true;
  }

  rootRedirect(userState: UserState) {
    const pathname = window.location.pathname;
    if (['/', '/root', '/signin', '/signup', '/budget'].includes(pathname)) {
      if (UserService.isAuthenticated(userState)) {
        this.router.navigate(['/budget']);
      } else {
        this.router.navigateByUrl('/signin', { replaceUrl: true });
      }
    }
  }
}
