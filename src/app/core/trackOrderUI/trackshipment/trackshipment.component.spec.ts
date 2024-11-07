import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackshipmentComponent } from './trackshipment.component';

describe('TrackshipmentComponent', () => {
  let component: TrackshipmentComponent;
  let fixture: ComponentFixture<TrackshipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackshipmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackshipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
