import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { HttpParams } from '@angular/common/http';
import {log} from 'util';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = 'login';

  constructor(private serverService: ServerService) { }

  login(username: string, password: string) {
    const params = new HttpParams().set('username', username).set('password', password);
    return this.serverService.get(this.url, params);
  }
}
