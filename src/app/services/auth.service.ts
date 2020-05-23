import { UserService, UserState } from './user.service';
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
    if (['/', '/root', '/signin', '/signup', '/budget', '/context'].includes(pathname)) {
      if (UserService.isAuthenticated(userState)) {
        this.router.navigate(['/context']);
      } else {
        this.router.navigateByUrl('/signin', { replaceUrl: true });
      }
    }
  }
}
