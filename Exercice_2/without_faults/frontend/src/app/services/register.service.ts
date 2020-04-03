import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private url = 'register';

  constructor(private serverService: ServerService) { }

  register(username: string, email: string, password: string) {
    const data = new FormData();
    data.append('username', username);
    data.append('email', email);
    data.append('password', password);
    return this.serverService.post(this.url, data);
  }
}
