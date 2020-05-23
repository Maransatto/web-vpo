import { ShowMessageService } from '../../services/show-message.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserStore } from 'src/app/store/user-store';
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
    private userStore: UserStore,
    private showMessage: ShowMessageService,
    private router: Router
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

    this.userStore.signUp(user).then(data => {
      this.showMessage.success('Usuário cadastrado com sucesso');
      this.router.navigate(['/signin']);
    }).catch((error) => {
      console.error(error);
      this.errMsg = error.error.message;
    });
  }

}
