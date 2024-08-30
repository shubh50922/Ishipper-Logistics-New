import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostmergequotesComponent } from './postmergequotes.component';

describe('PostmergequotesComponent', () => {
  let component: PostmergequotesComponent;
  let fixture: ComponentFixture<PostmergequotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostmergequotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostmergequotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
