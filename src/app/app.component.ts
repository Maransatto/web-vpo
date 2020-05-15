import { AuthService } from './auth.service';
import { UserService } from './services/user.service';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web-vpo';

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
    this.initialize();
  }

  initialize() {
    this.userService.load().then((state) => {
      console.log('initialize state', state);
      this.authService.rootRedirect(state);
    });
  }
}
