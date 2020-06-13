import { TestBed } from '@angular/core/testing';

import { ServerTransactionService } from './server-transaction.service';

describe('ServerTransactionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServerTransactionService = TestBed.get(ServerTransactionService);
    expect(service).toBeTruthy();
  });
});
