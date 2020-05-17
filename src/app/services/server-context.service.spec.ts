import { TestBed } from '@angular/core/testing';

import { ServerContextService } from './server-context.service';

describe('ServerContextService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServerContextService = TestBed.get(ServerContextService);
    expect(service).toBeTruthy();
  });
});
