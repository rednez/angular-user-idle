import { ModuleWithProviders, NgModule } from '@angular/core';
import { UserIdleConfig } from './angular-user-idle.config';

@NgModule({
  imports: [],
})
export class UserIdleModule {
  static forRoot(config: UserIdleConfig): ModuleWithProviders<UserIdleModule> {
    return {
      ngModule: UserIdleModule,
      providers: [{ provide: UserIdleConfig, useValue: config }],
    };
  }
}
