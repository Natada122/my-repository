import { TestBed } from '@angular/core/testing';

import { SerialService } from './serial.service';

describe('SerialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SerialService = TestBed.get(SerialService);
    expect(service).toBeTruthy();
  });
});
