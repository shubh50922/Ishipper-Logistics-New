import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionAdressComponent } from './collection-adress.component';

describe('CollectionAdressComponent', () => {
  let component: CollectionAdressComponent;
  let fixture: ComponentFixture<CollectionAdressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionAdressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionAdressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
