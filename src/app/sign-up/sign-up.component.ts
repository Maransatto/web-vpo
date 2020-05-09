import { UserService } from './../services/user.service';
import { ServerUserService } from './../services/server-user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(10)]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    cpassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  errMsg: string;

  constructor(
    private serverUserService: ServerUserService,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const user = {
      nome: this.form.get('nome').value,
      email: this.form.get('email').value,
      password: this.form.get('password').value,
      cpassword: this.form.get('cpassword').value
    };

    this.serverUserService.signUp(user).subscribe(userData => {
      console.log(userData);
    }, error => {
      console.log(error);
      this.errMsg = error.error.message;
    });
  }

}
