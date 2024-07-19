import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarrentCard2Component } from './warrent-card2.component';

describe('WarrentCard2Component', () => {
  let component: WarrentCard2Component;
  let fixture: ComponentFixture<WarrentCard2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarrentCard2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarrentCard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
