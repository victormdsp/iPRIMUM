import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public login: string;
  public senha: string;

  constructor(
    private requestCtrl: RequestService,
    private route: Router
  ) {}

  ngOnInit() {
  }

  public changeLogin(ev?){
    this.login = ev;
  }

  public changePassword(ev?){
    this.senha = ev;
  }

  public async logar(){
    const login = await this.requestCtrl.requestLogin(this.login, this.senha)
    console.log(login)
    this.route.navigate(['/home'], {state: {token: login}});
  }

}
