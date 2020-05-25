import { AuthService } from '../../services/auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ShowMessageService } from '../../services/show-message.service';
import { UserStore } from 'src/app/store/user-store';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(
    private userStore: UserStore,
    private globalService: GlobalService,
    private authService: AuthService,
    private showMessageService: ShowMessageService
  ) { }

  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  errMsg: string;

  ngOnInit() {
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const userLogin = {
      email: this.form.get('email').value,
      password: this.form.get('password').value
    };

    this.userStore.signIn(userLogin).then((data) => {
      const context = this.userStore.state.currentContext;
      this.globalService.loadServerData(context)
        .catch((error) => this.showMessageService.error(error.error.message));
      this.authService.rootRedirect(data);
    }).catch((error) => this.showMessageService.error(error.error.message));
  }

}
