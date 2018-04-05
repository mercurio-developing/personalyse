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
  loading = false;
  loadingDash = false;

  constructor(private tracker: TrackerService) {}

  ngOnInit() {
    this.loading = true;
    this.tracker.getProfile().subscribe(data => {
      this.loading = false;
      this.profiles = data
    })
    this.enableDash = false;
    this.showForm = false;
    this.spotForm = false;
  }

  change(event) {
    console.log(event)
    this.loadingDash = event;
  }

  openDash(i) {
    this.enableDash = true;
    this.loadingDash = true;
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
