/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FareService } from './fare.service';

describe('Service: Fare', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FareService]
    });
  });

  it('should ...', inject([FareService], (service: FareService) => {
    expect(service).toBeTruthy();
  }));
});
