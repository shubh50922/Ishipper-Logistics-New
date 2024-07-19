import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamedayServiceComponent } from './sameday-service.component';

describe('SamedayServiceComponent', () => {
  let component: SamedayServiceComponent;
  let fixture: ComponentFixture<SamedayServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SamedayServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SamedayServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
