import { Component, OnInit } from '@angular/core';
import {log} from 'util';

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

  constructor() { }

  ngOnInit(): void {
  }

  isInvalid() {
    const invalid = this.username === '';
    return invalid || this.password === '';
  }

  login() {
    this.invalid = false;
    log('Hello Login');
  }

}
