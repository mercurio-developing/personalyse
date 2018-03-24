import { Component, OnInit } from '@angular/core';
import { FbSdk } from '../fb-sdk';


@Component({
  selector: 'app-top-posts',
  templateUrl: './top-posts.component.html',
  styleUrls: ['./top-posts.component.css']
})
export class TopPostsComponent implements OnInit {
  options = ['TOTAL ENGAGEMENTS', 'MOST COMMENTS', 'MOST SHARES', 'MOST REACTIONS'];
  facebook;

  constructor() { }

  ngOnInit() {
    this.facebook = new FbSdk('191751471259286')
  }

  clicked(event) {
    event.target.classList.add('active');
  }
}





