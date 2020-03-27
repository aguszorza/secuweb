import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private url = '';

  constructor(private serverService: ServerService) { }

  home() {
    return this.serverService.get(this.url);
  }
}
