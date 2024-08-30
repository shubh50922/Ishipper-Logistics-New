import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierNameComponent } from './courier-name.component';

describe('CourierNameComponent', () => {
  let component: CourierNameComponent;
  let fixture: ComponentFixture<CourierNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourierNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourierNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
