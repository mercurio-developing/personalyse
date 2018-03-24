import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import { environmentProd } from '../../../environments/environment.prod';

import { isDevMode } from '@angular/core';

@Injectable()
export class AuthService {

serverUrl;

  constructor(private http: HttpClient, private router: Router) {
    if (isDevMode()) {
      this.serverUrl = 'http://localhost:3000/';
    } else {
      this.serverUrl = environmentProd.server;
    }
  }

  login(email: string, password: string) {
    return this.http.post<any>(this.serverUrl+'user/login', { email: email, password: password })
      .map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
