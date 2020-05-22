import { ShowMessageService } from './show-message.service';
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
    private authService: AuthService,
    private showMessageService: ShowMessageService
  ) {
    this.initialize();
  }

  initialize() {
    this.userService.load().then((state) => {
      if (this.userService.isAuthenticated()) {
        this.userService.loadContexts().catch((error) => this.showMessageService.error(error.error.message));
      }
      this.authService.rootRedirect(state);
    })
    .catch((error) => {
      this.showMessageService.error(error.error.message);
    });
  }
}
