import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarrentyLayoutComponent } from './warrenty-layout.component';

describe('WarrentyLayoutComponent', () => {
  let component: WarrentyLayoutComponent;
  let fixture: ComponentFixture<WarrentyLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarrentyLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarrentyLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
