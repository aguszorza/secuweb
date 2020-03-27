import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'login';
  private logoutUrl = 'logout';

  constructor(private serverService: ServerService) { }

  login(username: string, password: string) {
    const params = new HttpParams().set('username', username).set('password', password);
    return this.serverService.get(this.loginUrl, params);
  }

  logout() {
    return this.serverService.get(this.logoutUrl);
  }
}
