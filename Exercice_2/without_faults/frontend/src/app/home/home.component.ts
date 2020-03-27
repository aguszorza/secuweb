import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { Router } from '@angular/router';
import {log} from "util";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Welcome';
  content = '';

  constructor(private homeService: HomeService, private router: Router) { }

  ngOnInit(): void {
    this.homeService.home().subscribe((data: any) => {
      this.content = data.content;
    }, error => {
      this.router.navigate(['login']);
    });
  }

  logout() {
    log('logout');
    this.router.navigate(['login']);
    return 'logout';
  }
}
