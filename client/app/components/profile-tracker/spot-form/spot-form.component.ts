import { Component, OnInit } from '@angular/core';
import { TrackerService } from '../tracker.service'

@Component({
  selector: 'app-spot-form',
  templateUrl: './spot-form.component.html',
  styleUrls: ['./spot-form.component.css'],
  providers:[TrackerService]
})
export class SpotFormComponent implements OnInit {
  errors
  constructor(private tracker:TrackerService) { }

  ngOnInit() {
  }

  onSubmit(dataUrl) {
    this.tracker.sendUrlSpot(dataUrl).subscribe((data) => {
    },
      error => {
        this.errors = error;
      }
    )
  }

}
