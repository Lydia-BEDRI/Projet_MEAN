import { TestBed } from '@angular/core/testing';

import { BiensServiceService } from './biens-service.service';

describe('BiensServiceService', () => {
  let service: BiensServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BiensServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
