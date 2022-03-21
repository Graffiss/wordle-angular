import { TestBed } from '@angular/core/testing';

import { AddGuessService } from './add-guess.service';

describe('AddGuessService', () => {
  let service: AddGuessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddGuessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
