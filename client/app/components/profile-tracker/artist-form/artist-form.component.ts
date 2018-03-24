import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TrackerService } from '../tracker.service'

export interface Artist {
  createdAt: string,
  artistId: string,
  name: string,
  src: string,
  urls: string[]
}

@Component({
  selector: 'app-artist-form',
  templateUrl: './artist-form.component.html',
  styleUrls: ['./artist-form.component.css'],
  providers:[TrackerService]
})


export class ArtistFormComponent implements OnInit {
  
  profiles: Artist[] = [];
  profile;
  newArtist;
  @Output() updateProfile: EventEmitter<any> = new EventEmitter<any>();
  face:string
  inst:string
  twit:string
  youtu:string
  spot:string
  errors;

  constructor(private tracker:TrackerService) { 
  }

  ngOnInit() {
  }

  ngDoCheck() {
    let changes = this.profile;
    if (changes) {
      this.updateProfile.emit(changes);
    }
  }

  onSubmit(dataUrl) {
    let selecArtist = {
      createdAt:'',
      artistId: '',
      name: '',
      src: '',
      urls: [dataUrl.face, dataUrl.ins, dataUrl.twit, dataUrl.youtu, dataUrl.spot]
    } as Artist

    this.tracker.sendUrls(dataUrl).subscribe((data) => {
        let dato: any;
        dato = data;
        selecArtist.createdAt = new Date().toJSON().slice(0, 10);
        selecArtist.artistId = dato.id;
        selecArtist.name = dato.name;
        selecArtist.src = dato.picture.data.url;
      },
      error => {
        this.errors = error;
      },
      () => {
        this.tracker.saveProfile(selecArtist).subscribe((data) => {
        this.tracker.saveApi(selecArtist).subscribe((data) => {
          window.location.reload();
        })
      })
    })
  }
}
