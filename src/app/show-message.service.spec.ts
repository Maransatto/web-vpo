import { TestBed } from '@angular/core/testing';

import { ShowMessageService } from './show-message.service';

describe('ShowMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShowMessageService = TestBed.get(ShowMessageService);
    expect(service).toBeTruthy();
  });
});
