import { TestBed } from '@angular/core/testing';

import { SuperadminDetailService } from './superadmin-detail.service';

describe('SuperadminDetailService', () => {
  let service: SuperadminDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperadminDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
