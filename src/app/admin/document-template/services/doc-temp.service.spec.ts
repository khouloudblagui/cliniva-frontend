import { TestBed } from '@angular/core/testing';

import { DocTempService } from './doc-temp.service';

describe('DocTempService', () => {
  let service: DocTempService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocTempService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
