import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentGraphComponent } from './content-graph.component';

describe('ContentGraphComponent', () => {
  let component: ContentGraphComponent;
  let fixture: ComponentFixture<ContentGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
