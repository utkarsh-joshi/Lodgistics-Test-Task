import { TestBed } from '@angular/core/testing';

import { UserDataProviderService } from './user-data-provider.service';

describe('UserDataProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserDataProviderService = TestBed.get(UserDataProviderService);
    expect(service).toBeTruthy();
  });
});
