import { TestBed } from '@angular/core/testing';

import { ServerBudgetService } from './server-budget.service';

describe('ServerBudgetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServerBudgetService = TestBed.get(ServerBudgetService);
    expect(service).toBeTruthy();
  });
});
