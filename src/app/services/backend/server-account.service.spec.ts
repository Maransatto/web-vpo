import { TestBed } from '@angular/core/testing';

import { ServerAccountService } from './server-account.service';

describe('ServerAccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServerAccountService = TestBed.get(ServerAccountService);
    expect(service).toBeTruthy();
  });
});
