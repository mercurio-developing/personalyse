import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TrackerService } from './tracker.service';
import { Observable } from 'rxjs/Rx';
import { FilterPipe } from '../../pipes/filter.pipe'

@Component({
  selector: 'app-profile-tracker',
  templateUrl: './profile-tracker.component.html',
  styleUrls: ['./profile-tracker.component.css'],
  providers: [TrackerService]
})

export class ProfileTrackerComponent implements OnInit {

  enableDash: boolean = false;
  profiles
  profile;
  artists;
  artist;
  showForm;
  spotForm;

  constructor(private tracker: TrackerService) {}

  ngOnInit() {
    this.tracker.getProfile().subscribe(data => {
      this.profiles = data
    })
    this.enableDash = false;
    this.showForm = false;
    this.spotForm = false;
  }

  openDash(i) {
    this.enableDash = true;
    this.artist = this.profiles[i]
    return this.profiles[i];
  }

  add() {
    this.showForm = !this.showForm
  }

  spot() {
    this.spotForm = !this.spotForm
  }

  newProfile(e) {
    this.profile = e;
    this.profiles.push(this.profile)
  }

}
