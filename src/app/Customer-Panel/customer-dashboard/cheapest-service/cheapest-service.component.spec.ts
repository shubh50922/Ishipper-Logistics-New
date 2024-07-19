import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheapestServiceComponent } from './cheapest-service.component';

describe('CheapestServiceComponent', () => {
  let component: CheapestServiceComponent;
  let fixture: ComponentFixture<CheapestServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheapestServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheapestServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
