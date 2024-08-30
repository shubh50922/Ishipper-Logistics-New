import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionTodayComponent } from './collection-today.component';

describe('CollectionTodayComponent', () => {
  let component: CollectionTodayComponent;
  let fixture: ComponentFixture<CollectionTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionTodayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
