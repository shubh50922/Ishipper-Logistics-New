import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminCommissionComponent } from './super-admin-commission.component';

describe('SuperAdminCommissionComponent', () => {
  let component: SuperAdminCommissionComponent;
  let fixture: ComponentFixture<SuperAdminCommissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperAdminCommissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperAdminCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
