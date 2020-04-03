import { Component, OnInit } from '@angular/core';
import { MyLocalStorageService } from '../services/my-local-storage.service';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  title = 'Register';
  username = '';
  email = '';
  password = '';
  invalid = false;

  constructor(private registerService: RegisterService, private router: Router,
              private localStorage: MyLocalStorageService) { }

  ngOnInit(): void {
    if (this.localStorage.isLoggedIn()) {
      this.router.navigate(['']);
    }
  }

  isInvalid() {
    let invalid = this.username === '';
    invalid = invalid || this.email === '';
    return invalid || this.password === '';
  }

  register() {
    this.invalid = false;
    this.registerService.register(this.username, this.email, this.password)
      .subscribe(data => {
        this.router.navigate(['login']);
      }, error => {
        this.invalid = true;
        this.password = '';
      });
  }
}
