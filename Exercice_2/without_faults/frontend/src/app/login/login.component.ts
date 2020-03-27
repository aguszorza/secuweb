import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Login';
  username = '';
  password = '';
  invalid = false;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  isInvalid() {
    const invalid = this.username === '';
    return invalid || this.password === '';
  }

  login() {
    this.invalid = false;
    this.loginService.login(this.username, this.password)
      .subscribe(data => {
        this.router.navigate(['']);
      }, error => {
        this.invalid = true;
        this.password = '';
      });
  }

}
