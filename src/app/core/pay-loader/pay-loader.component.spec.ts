import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayLoaderComponent } from './pay-loader.component';

describe('PayLoaderComponent', () => {
  let component: PayLoaderComponent;
  let fixture: ComponentFixture<PayLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
