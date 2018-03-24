import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';



@Injectable()
export class TrackerService {

  public urls;
  errors;
  facebook: any;
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  getProfile(){
    return this.http.get('http://localhost:3000/user/profiles');
  }

  getData(id) {
    return this.http.post('http://localhost:3000/user/profiles/db', { id: id });
  }


  sendUrlSpot(dataUrl) {
    // return this.http.post('http://localhost:3000/api/spotify/playlist/', { id: dataUrl.id, artist: dataUrl.artist });
    return this.http.post('http://localhost:3000/api/spotify/playlist/save', { id: dataUrl.playlist, user: dataUrl.user });
  }

  sendUrls(url){
    return this.http.post('http://localhost:3000/api/facebook/profile', { id: url.face })
  }

  saveProfile(artist){
    return this.http.post('http://localhost:3000/user/profiles', { profile:artist })
  }

  saveApi(data) {
    return Observable.forkJoin(
      this.http.post('http://localhost:3000/api/facebook/save', { id: data.urls[0] }),
      this.http.post('http://localhost:3000/api/instagram/save', { id: data.urls[1], artistId: data.artistId }),
      this.http.post('http://localhost:3000/api/twitter/save', { id: data.urls[2], artistId: data.artistId }),
      this.http.post('http://localhost:3000/api/youtube/save', { id: data.urls[3], artistId:data.artistId }),
      this.http.post('http://localhost:3000/api/spotify/save', { id: data.urls[4], artistId: data.artistId })
    )}
}
