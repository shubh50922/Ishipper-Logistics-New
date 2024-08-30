import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamedayComponent } from './sameday.component';

describe('SamedayComponent', () => {
  let component: SamedayComponent;
  let fixture: ComponentFixture<SamedayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SamedayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SamedayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
