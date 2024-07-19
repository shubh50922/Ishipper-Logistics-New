import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopStriperComponent } from './top-striper.component';

describe('TopStriperComponent', () => {
  let component: TopStriperComponent;
  let fixture: ComponentFixture<TopStriperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopStriperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopStriperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
