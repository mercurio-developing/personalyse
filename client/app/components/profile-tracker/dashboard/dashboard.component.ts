import { Component, OnInit,Input, AfterViewInit } from '@angular/core';
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
  
  @Input() profiles;
  @Input() selected;
  fb;
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
      this.loading = true;
      let _id = this.selected._id
      this.tracker.getData(_id).subscribe(data => {
      this.loading = false;
      this.fb = data[0].face[0]
      this.ins = data[0].inst[0] 
      this.tw = data[0].twit[0] 
      this.you = data[0].you[0] 
      this.sp = data[0].spot[0]
    })
  }

  openDetail(i) {
    this.loading = true;
    this.selected = this.profiles[i];
    let _id = this.selected._id
    let url = this.profiles[i].urls;
    let urls = this.tracker.getData(_id).subscribe(data => {
      this.loading = false;
      this.fb = data[0].face[0]
      this.ins = data[0].inst[0]
      this.tw = data[0].twit[0]
      this.you = data[0].you[0]
      this.sp = data[0].spot[0]
      this.videos = data[5];
    })
  }
  
}
