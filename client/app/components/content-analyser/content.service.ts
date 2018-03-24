import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ContentService {

facebook: any;
constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  getData(fbData) {
    return this.http.post('http://localhost:3000/api/facebook/profile', { id: fbData })
  }
}


