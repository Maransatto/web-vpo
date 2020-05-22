import { ShowMessageService } from './show-message.service';
import { AuthService } from './auth.service';
import { UserService } from './services/user.service';
import { Component } from '@angular/core';
import { ContextStore } from './store/context-store';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web-vpo';

  constructor(
    private userService: UserService,
    private contextStore: ContextStore,
    private authService: AuthService,
    private showMessageService: ShowMessageService
  ) {
    this.initialize();
  }

  initialize() {
    this.userService.load().then((state) => {
      if (this.userService.isAuthenticated()) {
        this.contextStore.loadContexts().catch((error) => this.showMessageService.error(error.error.message));
      }
      this.authService.rootRedirect(state);
    })
    .catch((error) => {
      this.showMessageService.error(error.error.message);
    });
  }
}
