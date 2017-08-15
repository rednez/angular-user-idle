import { ModuleWithProviders, NgModule } from '@angular/core';

import { UserIdleService } from './user-idle.service';
import { UserIdleServiceConfig } from './user-idle.config';

/**
 * User's idle module.
 */
@NgModule({
  providers: [UserIdleService]
})
export class UserIdleModule {
  static forRoot(config: UserIdleServiceConfig): ModuleWithProviders {
    return {
      ngModule: UserIdleModule,
      providers: [
        {provide: UserIdleServiceConfig, useValue: config}
      ]
    };
  }
}
