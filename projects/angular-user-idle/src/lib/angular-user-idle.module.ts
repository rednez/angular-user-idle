import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideUserIdleConfig, UserIdleConfig } from './angular-user-idle.config';

/**
 * User's idle module.
 * @deprecated since version 4.0.0  - use provideUserIdleConfig(config: UserIdleConfig) instead
 */
@NgModule({
  imports: [],
})
export class UserIdleModule {
  static forRoot(config: UserIdleConfig): ModuleWithProviders<UserIdleModule> {
    return {
      ngModule: UserIdleModule,
      providers: [provideUserIdleConfig(config)],
    };
  }
}
