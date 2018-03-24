import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentAnalyserComponent } from './content-analyser.component';

describe('ContentAnalyserComponent', () => {
  let component: ContentAnalyserComponent;
  let fixture: ComponentFixture<ContentAnalyserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentAnalyserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentAnalyserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
