import { TestBed } from '@angular/core/testing';

import { AdverseEffectService } from './adverse-effect.service';

describe('AdverseEffectService', () => {
  let service: AdverseEffectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdverseEffectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
