import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTrackerComponent } from './profile-tracker.component';

describe('ProfileTrackerComponent', () => {
  let component: ProfileTrackerComponent;
  let fixture: ComponentFixture<ProfileTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
