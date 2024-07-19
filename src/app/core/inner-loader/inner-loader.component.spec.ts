import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerLoaderComponent } from './inner-loader.component';

describe('InnerLoaderComponent', () => {
  let component: InnerLoaderComponent;
  let fixture: ComponentFixture<InnerLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnerLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InnerLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
