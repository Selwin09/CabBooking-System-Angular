import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FareEstimateComponent } from './fare-estimate.component';

describe('FareEstimateComponent', () => {
  let component: FareEstimateComponent;
  let fixture: ComponentFixture<FareEstimateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FareEstimateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FareEstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
