import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environmentProd } from '../../../environments/environment.prod';
import { isDevMode } from '@angular/core';

@Injectable()
export class UserService {

  serverUrl;

  constructor(private http: HttpClient) { 
    if (isDevMode()) {
      this.serverUrl = 'http://localhost:3000/';
    } else {
      this.serverUrl = environmentProd.server;
    }
  }

  getAll() {
    return this.http.get(this.serverUrl+'user/register');
  }

  // getById(_id: string) {
  //   return this.http.get(appConfig.apiUrl + '/users/' + _id);
  // }

  create(user) {
    return this.http.post(this.serverUrl +'user/register', user);
  }

  // update(user: User) {
  //   return this.http.put(appConfig.apiUrl + '/users/' + user._id, user);
  // }

  // delete(_id: string) {
  //   return this.http.delete(appConfig.apiUrl + '/users/' + _id);
  // }
}