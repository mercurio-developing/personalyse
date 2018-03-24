import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get('http://localhost:3000/user/register');
  }

  // getById(_id: string) {
  //   return this.http.get(appConfig.apiUrl + '/users/' + _id);
  // }

  create(user) {
    return this.http.post('http://localhost:3000/user/register', user);
  }

  // update(user: User) {
  //   return this.http.put(appConfig.apiUrl + '/users/' + user._id, user);
  // }

  // delete(_id: string) {
  //   return this.http.delete(appConfig.apiUrl + '/users/' + _id);
  // }
}