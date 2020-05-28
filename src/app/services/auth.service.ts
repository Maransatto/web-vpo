import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserStore, UserState } from '../store/user-store';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(
    private userStore: UserStore,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.userStore.isAuthenticated()) {
      this.router.navigate(['/signin']);
      return false;
    }
    return true;
  }

  rootRedirect(userState: UserState) {
    const pathname = window.location.pathname;
    if (['/', '/root', '/signin', '/signup', '/context'].includes(pathname)) {
      console.log('rootRedirect userState', userState);

      if (UserStore.isAuthenticated(userState)) {
        this.router.navigate(['/context']);
      } else {
        this.router.navigateByUrl('/signin', { replaceUrl: true });
      }
    }
  }
}
