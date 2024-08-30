import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplicaLayoutComponent } from './replica-layout.component';

describe('ReplicaLayoutComponent', () => {
  let component: ReplicaLayoutComponent;
  let fixture: ComponentFixture<ReplicaLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplicaLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReplicaLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
