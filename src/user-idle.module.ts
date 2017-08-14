import { NgModule } from '@angular/core';

import { UserIdleService } from './user-idle.service';

/**
 * User's idle module.
 */
@NgModule({
  providers: [UserIdleService]
})
export class UserIdleModule {
}
