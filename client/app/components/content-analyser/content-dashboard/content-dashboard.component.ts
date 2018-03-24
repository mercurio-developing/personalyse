import { Component, OnInit,Input } from '@angular/core';
import { ContentService } from '../content.service';
import { FbSdk } from '../fb-sdk';

@Component({
  selector: 'app-content-dashboard',
  templateUrl: './content-dashboard.component.html',
  styleUrls: ['./content-dashboard.component.css']
})
export class ContentDashboardComponent implements OnInit {

  @Input() pagesUrl;
  @Input() selected;
  facebook;
  queryProfile;
  
  constructor(private contentServ: ContentService) { }

  ngOnInit() {
    this.facebook = new FbSdk('191751471259286')
    console.log(this.selected, 'log from tracker service')
    // let _id = this.selected._id
    // this.contentServ.getData(_id).subscribe(data => {
    //   console.log(data, 'from get data')
    // })
  }

}
