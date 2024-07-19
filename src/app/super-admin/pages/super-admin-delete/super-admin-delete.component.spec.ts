import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminDeleteComponent } from './super-admin-delete.component';

describe('SuperAdminDeleteComponent', () => {
  let component: SuperAdminDeleteComponent;
  let fixture: ComponentFixture<SuperAdminDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperAdminDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperAdminDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
