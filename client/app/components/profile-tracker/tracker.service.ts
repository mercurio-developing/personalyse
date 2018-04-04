import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import { environmentProd } from '../../../environments/environment.prod';

import { isDevMode } from '@angular/core';


@Injectable()
export class TrackerService {

  public urls;
  errors;
  facebook: any;
  serverUrl;

  constructor(private http: HttpClient) {
      if (isDevMode()) {
        this.serverUrl = 'http://localhost:3000/';
        console.log('dev')
      } else {
        // this.serverUrl = environmentProd.server;
        this.serverUrl = 'http://localhost:3000/';
      }
  }



  getProfile(){
    return this.http.get(this.serverUrl+'user/profiles');
  }

  getData(id) {
    return this.http.post(this.serverUrl+'user/profiles/db', { id: id });
  }

  sendUrlSpot(dataUrl) {
    // return this.http.post('http://localhost:3000/api/spotify/playlist/', { id: dataUrl.id, artist: dataUrl.artist });
    return this.http.post(this.serverUrl+'api/spotify/playlist/save', { id: dataUrl.playlist, user: dataUrl.user });
  }

  sendUrls(url){
    return this.http.post(this.serverUrl+'api/facebook/profile', { id: url.face })
  }

  saveProfile(artist){
    return this.http.post(this.serverUrl +'user/profiles', { profile:artist })
  }

  saveApi(data) {
    return Observable.forkJoin(
      this.http.post(this.serverUrl+'api/facebook/save', { id: data.urls[0] }),
      this.http.post(this.serverUrl+'api/instagram/save', { id: data.urls[1], artistId: data.artistId }),
      this.http.post(this.serverUrl+'api/twitter/save', { id: data.urls[2], artistId: data.artistId }),
      this.http.post(this.serverUrl+'api/youtube/save', { id: data.urls[3], artistId:data.artistId }),
      this.http.post(this.serverUrl+'api/spotify/save', { id: data.urls[4], artistId: data.artistId })
    )}
}
