import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastestServiceComponent } from './fastest-service.component';

describe('FastestServiceComponent', () => {
  let component: FastestServiceComponent;
  let fixture: ComponentFixture<FastestServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FastestServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FastestServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
