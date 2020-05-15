import { AuthService } from './../auth.service';
import { UserService } from './../services/user.service';
import { Router } from '@angular/router';
import { ServerUserService } from './../services/server-user.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(
    private serverUserService: ServerUserService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
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

    this.serverUserService.signIn(userLogin).subscribe(async data => {
      await this.userService.updateUser(data);
      this.authService.rootRedirect(data);
    }, error => {
      console.error(error);
      this.errMsg = error.error.message;
    });

  }

}
