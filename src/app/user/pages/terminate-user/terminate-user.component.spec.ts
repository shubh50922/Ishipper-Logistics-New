import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminateUserComponent } from './terminate-user.component';

describe('TerminateUserComponent', () => {
  let component: TerminateUserComponent;
  let fixture: ComponentFixture<TerminateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerminateUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerminateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
