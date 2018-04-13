import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TrackerService } from '../tracker.service';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { FilterPipe } from '../../../pipes/filter.pipe';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[TrackerService]
})
export class DashboardComponent implements OnInit {
  @Output()
  change: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() profiles;
  @Input() selected;
  fb:any;
  ins;
  tw;
  sp;
  you;
  tracks;
  videos;
  basic;
  queryProfile;
  public loading = false;

  constructor(private tracker:TrackerService) {
   }

  ngOnInit() {
      let _id = this.selected._id
      this.tracker.getData(_id).subscribe(data => {
      this.change.emit(false);      
        let dato: any;
        dato = data;
      this.fb = dato[0].face[0];
      // this.ins = dato[0].inst[0] 
      this.tw = dato[0].twit[0]; 
      this.you = dato[0].you[0]; 
      this.sp = dato[0].spot[0];
    })
  }

  openDetail(i) {
    this.loading = true;
    this.selected = this.profiles[i];
    let _id = this.selected._id
    let url = this.profiles[i].urls;
    let urls = this.tracker.getData(_id).subscribe(data => {
      this.loading = false;
      let dato: any;
      dato = data;
      this.fb = dato[0].face[0]
      // this.ins = dato[0].inst[0]
      this.tw = dato[0].twit[0]
      this.you = dato[0].you[0]
      this.sp = dato[0].spot[0]
      this.videos = dato[5];
    })
  }
  
}
