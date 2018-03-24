import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environmentProd } from '../../../environments/environment.prod';
import { isDevMode } from '@angular/core';

@Injectable()
export class ContentService {

facebook: any;
serverUrl;

constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.serverUrl = 'http://localhost:3000/';
    } else {
      this.serverUrl = environmentProd.server;
    }
  }

  ngOnInit() {
  }

  getData(fbData) {
    return this.http.post(this.serverUrl+'api/facebook/profile', { id: fbData })
  }
}


