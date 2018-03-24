import { Component, OnInit } from '@angular/core';
import { ContentService } from './content.service';

export interface Artist {
  name: string,
  src: string,
}

@Component({
  selector: 'app-content-analyser',
  templateUrl: './content-analyser.component.html',
  styleUrls: ['./content-analyser.component.css'],
  providers:[ContentService]
})

export class ContentAnalyserComponent implements OnInit {

  showRow:Boolean;
  faceUrl:String;
  isSelec:boolean = false;
  isSelec2: boolean = true;
  isActive:boolean = true;
  last7Active:boolean = true;
  last30Active:boolean = false;
  enableDash:boolean = false;
  pagesUrl: Artist[] = [];
  artist;

  constructor(private contentServ:ContentService) { }

  ngOnInit() {
  }

  addUrl(url){

    let selecArtist = {
      name: '',
      src: ''
    } as Artist

    this.contentServ.getData(url).subscribe(data => {
        let dato:any;
        dato = data
        selecArtist.src = dato.picture.data.url;
        selecArtist.name = dato.name;
        this.pagesUrl.push(selecArtist);
     })
  }

  openDash(i) {
    console.log(i)
    console.log(this.pagesUrl)
    this.enableDash = true;
    this.artist = this.pagesUrl[i];
    return this.pagesUrl[i];
  }

  top(){
    this.isSelec = true;
    this.isSelec2 = false;
  }
  insig() {
    this.isSelec2 = true;
    this.isSelec = false;
  }

  clicked(event){
      console.log(event)
      event.target.classList.add('active'); // To ADD
  }

}
