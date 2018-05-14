import { TestBed, inject } from '@angular/core/testing';

import { UserIdleService } from './angular-user-idle.service';

describe('UserIdleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserIdleService]
    });
  });

  it('should be created', inject([UserIdleService], (service: UserIdleService) => {
    expect(service).toBeTruthy();
  }));
});
