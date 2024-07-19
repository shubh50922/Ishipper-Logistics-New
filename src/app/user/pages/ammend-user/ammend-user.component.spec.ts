import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmmendUserComponent } from './ammend-user.component';

describe('AmmendUserComponent', () => {
  let component: AmmendUserComponent;
  let fixture: ComponentFixture<AmmendUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmmendUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmmendUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
