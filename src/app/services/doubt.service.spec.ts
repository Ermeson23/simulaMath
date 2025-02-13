import { TestBed } from '@angular/core/testing';

import { DoubtService } from './doubt.service';

describe('DoubtService', () => {
  let service: DoubtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoubtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
