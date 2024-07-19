import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminEditComponent } from './super-admin-edit.component';

describe('SuperAdminEditComponent', () => {
  let component: SuperAdminEditComponent;
  let fixture: ComponentFixture<SuperAdminEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperAdminEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperAdminEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
