import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { MyLocalStorageService } from '../services/my-local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Welcome';
  content = '';

  constructor(private homeService: HomeService, private router: Router,
              private loginService: LoginService, private localStorage: MyLocalStorageService) { }

  ngOnInit(): void {
    this.homeService.home().subscribe((data: any) => {
      this.content = data.content;
    }, error => {
      this.localStorage.logOut();
      this.router.navigate(['login']);
    });
  }

  logout() {
    this.loginService.logout().subscribe((data: any) => {
      this.localStorage.logOut();
      this.router.navigate(['login']);
    }, error => {
      console.log(error);
    });
  }
}
