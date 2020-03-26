import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  get<T>(extension, params: HttpParams = new HttpParams()) {
    return this.http.get<T>(this.baseUrl + extension, { params }).pipe(catchError(this.handleError));
  }

  post<T>(extension, data = {}) {
    return this.http.post<T>(this.baseUrl + extension, data).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error.message || 'Error');
  }
}
