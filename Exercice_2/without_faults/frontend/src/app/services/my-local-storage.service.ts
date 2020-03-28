import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable({
  providedIn: 'root'
})
export class MyLocalStorageService {

  constructor(private localStorageService: LocalStorageService) { }

  logIn() {
    this.localStorageService.set('isLogged', true);
  }

  logOut() {
    this.localStorageService.remove('isLogged');
  }

  isLoggedIn() {
    return this.localStorageService.get('isLogged') !== null;
  }
}
