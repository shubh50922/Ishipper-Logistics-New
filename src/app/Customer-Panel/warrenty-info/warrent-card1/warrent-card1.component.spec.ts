import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarrentCard1Component } from './warrent-card1.component';

describe('WarrentCard1Component', () => {
  let component: WarrentCard1Component;
  let fixture: ComponentFixture<WarrentCard1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarrentCard1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarrentCard1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
