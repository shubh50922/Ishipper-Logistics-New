import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrierNameComponent } from './carrier-name.component';

describe('CarrierNameComponent', () => {
  let component: CarrierNameComponent;
  let fixture: ComponentFixture<CarrierNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarrierNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrierNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
