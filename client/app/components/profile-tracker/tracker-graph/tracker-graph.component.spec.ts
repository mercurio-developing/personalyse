import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerGraphComponent } from './tracker-graph.component';

describe('TrackerGraphComponent', () => {
  let component: TrackerGraphComponent;
  let fixture: ComponentFixture<TrackerGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
