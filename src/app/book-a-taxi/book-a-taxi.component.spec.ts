import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookATaxiComponent } from './book-a-taxi.component';

describe('BookATaxiComponent', () => {
  let component: BookATaxiComponent;
  let fixture: ComponentFixture<BookATaxiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookATaxiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookATaxiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
