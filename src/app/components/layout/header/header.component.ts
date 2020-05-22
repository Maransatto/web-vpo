import { AuthService } from '../../../auth.service';
import { UserService } from '../../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  nomeUsuario: string;
  emailUsuario: string;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.nomeUsuario = this.userService.nome;
    this.emailUsuario = this.userService.email;
  }

  logout() {
    this.userService.load().then((state) => {
      this.userService.clear();
    }).finally(() => {
      this.userService.state$.subscribe(async state => {
        this.authService.rootRedirect(state);
      });
    });
  }

}
