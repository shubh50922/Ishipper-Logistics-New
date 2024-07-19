import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentLayoutComponent } from './shipment-layout.component';

describe('ShipmentLayoutComponent', () => {
  let component: ShipmentLayoutComponent;
  let fixture: ComponentFixture<ShipmentLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipmentLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
