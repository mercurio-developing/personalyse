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

  constructor(private tracker:TrackerService) {
    console.log(this.profiles)
   }
  
  ngOnInit() {
      console.log(this.selected, 'log from tracker service')
      let _id = this.selected._id
      this.tracker.getData(_id).subscribe(data => {
      console.log(data,'from get data')
      this.basic = data[0]
      this.fb = data[0].face[0]
      this.ins = data[0].inst[0] 
      this.tw = data[0].twit[0] 
      this.you = data[0].you[0] 
      this.sp = data[0].spot[0]
    })
  }

  openDetail(i) {
    this.selected = this.profiles[i];
    console.log(this.selected)
    let _id = this.selected._id
    let url = this.profiles[i].urls;
    let urls = this.tracker.getData(_id).subscribe(data => {
      console.log(data)
      this.fb = data[0].face[0]
      this.ins = data[0].inst[0]
      this.tw = data[0].twit[0]
      this.you = data[0].you[0]
      this.sp = data[0].spot[0]
      this.videos = data[5];
      console.log(this.fb)
    })
  }
  
}
