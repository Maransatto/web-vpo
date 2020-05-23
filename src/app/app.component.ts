import { ShowMessageService } from './services/show-message.service';
import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { ContextStore } from './store/context-store';
import { UserStore } from './store/user-store';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web-vpo';

  constructor(
    private userStore: UserStore,
    private contextStore: ContextStore,
    private authService: AuthService,
    private showMessageService: ShowMessageService
  ) {
    this.initialize();
  }

  initialize() {
    this.userStore.load().then((state) => {
      if (this.userStore.isAuthenticated()) {
        this.contextStore.load().catch((error) => this.showMessageService.error(error.error.message));
      }
      this.authService.rootRedirect(state);
    })
    .catch((error) => {
      this.showMessageService.error(error.error.message);
    });
  }
}
